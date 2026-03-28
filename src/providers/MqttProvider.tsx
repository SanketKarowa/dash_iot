import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useMqttClient } from '../hooks/useMqttClient';
import { MqttContextType } from '../types/mqtt';

const MqttContext = createContext<MqttContextType>({
  client: null,
  status: 'disconnected',
  messages: {},
});

export function MqttProvider({ children }: { children: ReactNode }) {
  const mqttState = useMqttClient();

  return (
    <MqttContext.Provider value={mqttState}>
      {children}
    </MqttContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMqttContext() {
  return useContext(MqttContext);
}
