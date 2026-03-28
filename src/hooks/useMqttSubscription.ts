import { useState, useEffect } from 'react';
import { useMqttContext } from '../providers/MqttProvider';

export function useMqttSubscription(topic: string) {
  const { client, status } = useMqttContext();
  const [payload, setPayload] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'connected' || !client) return;

    client.subscribe(topic, (err: Error | null) => {
      if (err) console.error(`Subscription error for ${topic}:`, err);
    });

    const handleMessage = (msgTopic: string, message: Buffer) => {
      if (msgTopic === topic) {
        setPayload(message.toString());
      }
    };

    client.on('message', handleMessage);

    return () => {
      client.removeListener('message', handleMessage);
      client.unsubscribe(topic);
    };
  }, [client, status, topic]);

  return payload;
}
