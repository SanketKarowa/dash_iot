import { useState, useEffect, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { MQTT_CONFIG } from '../config/mqtt';
import { MqttContextType } from '../types/mqtt';

export function useMqttClient(): MqttContextType {
  const clientRef = useRef<MqttClient | null>(null);
  const [status, setStatus] = useState<MqttContextType['status']>('connecting');
  const [client, setClient] = useState<MqttClient | null>(null);
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_CONFIG.brokerUrl, MQTT_CONFIG.options);
    clientRef.current = mqttClient;

    mqttClient.on('connect', () => {
      setStatus('connected');
      setClient(mqttClient);
      console.log('MQTT Connected');
    });

    mqttClient.on('reconnect', () => {
      setStatus('reconnecting');
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
    });

    mqttClient.on('offline', () => {
      setStatus('disconnected');
    });

    mqttClient.on('close', () => {
      setStatus('disconnected');
    });

    // Centralised message handler with throttling to avoid UI lag
    // We use a local state-buffer to batch updates if they come too fast
    let messageBuffer: Record<string, string> = {};
    let throttleTimeout: NodeJS.Timeout | null = null;

    const flushBuffer = () => {
      setMessages(prev => ({
        ...prev,
        ...messageBuffer
      }));
      messageBuffer = {};
      throttleTimeout = null;
    };

    mqttClient.on('message', (topic, payload) => {
      messageBuffer[topic] = payload.toString();
      
      // Throttle updates to 10fps (100ms) to prevent React bottlenecking
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(flushBuffer, 100);
      }
    });

    return () => {
      if (throttleTimeout) clearTimeout(throttleTimeout);
      setStatus('disconnected');
      mqttClient.end();
    };
  }, []);

  return { client, status, messages };
}
