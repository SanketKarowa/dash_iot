import { useEffect } from 'react';
import { useMqttContext } from '../providers/MqttProvider';

export function useMqttSubscription(topic: string) {
  const { client, status, messages } = useMqttContext();

  useEffect(() => {
    if (status !== 'connected' || !client) return;

    client.subscribe(topic, (err: Error | null) => {
      if (err) console.error(`Subscription error for ${topic}:`, err);
    });

    return () => {
      client.unsubscribe(topic);
    };
  }, [client, status, topic]);

  return messages[topic] ?? null;
}
