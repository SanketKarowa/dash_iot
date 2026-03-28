export const MQTT_CONFIG = {
  // Using ws connection for mqtt built-in browser support 
  // For Docker deployment, pass VITE_MQTT_BROKER_URL as an environment variable
  brokerUrl: import.meta.env.VITE_MQTT_BROKER_URL || 'ws://localhost:9001',
  options: {
    protocolVersion: 4 as const,
    clean: true,
    keepalive: 60,
    reconnectPeriod: 1000,
  }
};

export const TOPICS = {
  SUBSCRIBE: {
    BATTERY_1: 'home/batt/b1', // LiFePo4_36
    BATTERY_2: 'home/batt/b2', // Li-ion_BATT
    BATTERY_3: 'home/batt/b3', // Li-ion-18
    BATTERY_4: 'home/batt/b4', // Li-ion_mrb
    MAINS: 'home/mains',
    RELAY_1_STATUS: '/status/r1',
    RELAY_2_STATUS: '/status/r2',
    RELAY_3_STATUS: '/status/r3',
    LED_1_BRIGHTNESS: 'home/led/l1/brightness',
  },
  PUBLISH: {
    RELAY_1_CMD: 'home/manual/r1',
    RELAY_2_CMD: 'home/manual/r2',
    RELAY_3_CMD: 'home/manual/r3',
    LED_1_CMD_BRIGHTNESS: 'home/led/cmd/l1/brightness',
    LED_2_CMD_BRIGHTNESS: 'home/led/cmd/l2/brightness',
    LED_1_CMD_STATE: 'home/led/cmd/l1/state',
    LED_2_CMD_STATE: 'home/led/cmd/l2/state',
    LED_1_MODE: 'home/led/l1/mode',
    LED_2_MODE: 'home/led/l2/mode',
  }
};
