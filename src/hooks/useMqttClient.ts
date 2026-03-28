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

    // Centralised message handler to avoid multiple listeners
    mqttClient.on('message', (topic, payload) => {
      setMessages(prev => ({
        ...prev,
        [topic]: payload.toString()
      }));
    });

    return () => {
      setStatus('disconnected');
      mqttClient.end(); // Graceful end avoids "WebSocket closed before established" warning in dev
    };
  }, []);

  return { client, status, messages };
}
