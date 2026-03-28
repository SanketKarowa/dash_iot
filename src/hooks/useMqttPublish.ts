import { useCallback } from 'react';
import { useMqttContext } from '../providers/MqttProvider';

export function useMqttPublish() {
  const { client, status } = useMqttContext();

  const publish = useCallback((topic: string, message: string, retain: boolean = false) => {
    if (status === 'connected' && client) {
      client.publish(topic, message, { retain }, (err: any) => {
        if (err) {
          console.error(`Error publishing to ${topic}:`, err);
        }
      });
    } else {
      console.warn('Cannot publish, MQTT not connected');
    }
  }, [client, status]);

  return publish;
}
