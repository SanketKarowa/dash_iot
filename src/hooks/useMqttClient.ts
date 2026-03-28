import { useState, useEffect, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { MQTT_CONFIG } from '../config/mqtt';
import { MqttContextType } from '../types/mqtt';

export function useMqttClient(): MqttContextType {
  const clientRef = useRef<MqttClient | null>(null);
  const [status, setStatus] = useState<MqttContextType['status']>('connecting');
  const [client, setClient] = useState<MqttClient | null>(null);

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

    return () => {
      mqttClient.end();
    };
  }, []);

  return { client, status };
}
