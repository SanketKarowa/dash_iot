import { useEffect } from 'react';
import { useMqttContext } from '../providers/MqttProvider';

export function useMqttSubscription(topic: string) {
  const { client, status, messages } = useMqttContext();

  useEffect(() => {
    // Client must be connected and not in a disconnecting/closing state
    if (status !== 'connected' || !client || !client.connected) return;

    client.subscribe(topic, (err: Error | null) => {
      if (err) console.error(`Subscription error for ${topic}:`, err);
    });

    return () => {
      client.unsubscribe(topic);
    };
  }, [client, status, topic]);

  return messages[topic] ?? null;
}
