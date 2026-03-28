# 🏠 Solar-Home IoT Dashboard

A modern, sleek, and responsive IoT home automation dashboard built with React 19, Vite, and Tailwind CSS 4. This dashboard replaces the standard Node-RED UI with a premium, dual-themed experience for monitoring solar/battery systems and controlling home lighting via MQTT.

## ✨ Features

- **Real-time Monitoring**: Live updates for 4 battery banks (LiFePo4, Li-ion) and Mains power status.
- **Dual Themes**: 
  - **"Aurora Night" (Dark)**: Deep navy with violet accents and glassmorphism.
  - **"Nordic Clean" (Light)**: Airy off-white with slate-blue/sage accents and soft shadows.
- **Interactive Controls**:
  - Individual relay switches for Indoors, Outdoors, and Corridors.
  - **Handy-Mains (Master Switch)**: Global control for all relays.
  - **MRB LED Dimming**: 0–255 brightness slider with bi-directional sync.
  - **Night Mode Scene**: Instant low-light configuration.
- **Micro-animations**: Smooth transitions using Framer Motion.
- **Browser-Aware Time**: Live animated clock in the header.

## 🛠 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query) v5
- **UI Primitives**: Radix UI
- **Animations**: Framer Motion
- **Communication**: MQTT.js (via WebSockets)
- **Icons**: Lucide React

## ⚙️ Configuration

The dashboard's MQTT broker address is configurable via environment variables (Vite-prefixed).

### Local Development
Create a `.env` file in the root:
```env
VITE_MQTT_BROKER_URL=ws://your-broker-url:9001
```

### Docker Deployment
Pass the broker URL as an environment variable during container startup:
```bash
docker run -p 80:80 -e VITE_MQTT_BROKER_URL=ws://192.168.1.100:9001 my-solar-dashboard
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+
- **MQTT Broker**: Ensure your Mosquitto broker (or similar) is running and has WebSockets enabled (standard port `9001`).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd solar-home-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MQTT:
   Update `src/config/mqtt.ts` with your broker's WebSocket URL if different from `ws://192.168.29.87:9001`.

4. Start development server:
   ```bash
   npm run dev
   ```

### Production Build

```bash
npm run build
npm run preview
```

## 🐳 Docker Support

Build and run the dashboard using Docker:

1. Build the image:
   ```bash
   docker build -t solar-home-dashboard .
   ```

2. Run the container:
   ```bash
   docker run -d -p 80:80 solar-home-dashboard
   ```

## 🏗 Project Structure

- `src/components/`: Modular UI components (Battery, Lights, LED, Layout).
- `src/hooks/`: Custom hooks for MQTT (sub/pub), theme management, and state.
- `src/providers/`: Context providers for MQTT connectivity.
- `src/styles/`: Design tokens and global CSS.
- `src/config/`: MQTT topic maps and configuration.

## 📄 License

This project is for internal home automation use.
