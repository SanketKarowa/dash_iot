import type { MqttClient } from 'mqtt';

export interface MqttContextType {
  client: MqttClient | null;
  status: 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
}
