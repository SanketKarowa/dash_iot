export interface MqttContextType {
  client: any | null;
  status: 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
}
