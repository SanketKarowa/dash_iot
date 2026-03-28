import { useState, useEffect } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { MQTT_CONFIG } from '../config/mqtt';
import { MqttContextType } from '../types/mqtt';

export function useMqttClient(): MqttContextType {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [status, setStatus] = useState<MqttContextType['status']>('disconnected');

  useEffect(() => {
    setStatus('connecting');
    const mqttClient = mqtt.connect(MQTT_CONFIG.brokerUrl, MQTT_CONFIG.options);

    mqttClient.on('connect', () => {
      setStatus('connected');
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

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  return { client, status };
}
