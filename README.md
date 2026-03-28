# 🏠 Solar-Home IoT Dashboard

A modern, sleek, and responsive IoT home automation dashboard built with **React 19**, **Vite**, and **Tailwind CSS 4**. This dashboard replaces the standard Node-RED UI with a premium, dual-themed experience for monitoring solar/battery systems and controlling home lighting via MQTT.

## ✨ Features

- **Real-time Monitoring**: Live updates for 4 battery banks (LiFePo4, Li-ion) and Mains power status.
- **Advanced Weather Dashboard**:
  - Live local weather (temperature, humidity, wind) via **Open-Meteo**.
  - Integrated **Air Quality Index (AQI)** monitoring (European AQI with PM2.5/PM10 metrics).
  - **UV Index** and **Barometric Pressure** tracking.
  - Automatically fetches data based on your configured city name.
- **Interactive Light Controls**:
  - Individual relay switches for Indoors, Outdoors, and Corridors.
  - **Active Lights Tracker**: Live summary of how many relays are currently ON.
  - **Handy-Mains (Master Switch)**: Global control for all relays.
  - **MRB LED Dimming**: 0–255 brightness slider with bi-directional sync and user-active dragging detection.
- **Dual Themes**: 
  - **"Aurora Night" (Dark)**: Deep navy with violet accents and glassmorphism.
  - **"Nordic Clean" (Light)**: Airy off-white with slate-blue/sage accents and soft shadows.
- **Micro-animations**: Smooth transitions using Framer Motion.
- **State Optimization**: Built with React 19 best practices, featuring zero-lag state synchronization and custom hooks for MQTT.

## 🛠 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query) v5
- **UI Primitives**: Radix UI
- **Animations**: Framer Motion
- **Communication**: MQTT.js (via WebSockets)
- **Weather API**: Open-Meteo (Weather & Air Quality)
- **Icons**: Lucide React

## ⚙️ Configuration

The dashboard's MQTT broker address and local city are configurable via environment variables (Vite-prefixed).

### Local Development
Create a `.env` file in the root:
```env
VITE_MQTT_BROKER_URL=ws://your-broker-url:9001
VITE_WEATHER_CITY=London
```

### Docker Deployment
The project includes a custom **Nginx configuration** to ensure proper routing for this SPA. You can build and run using:
```bash
docker build -t solar-home-dashboard .
docker run -p 80:80 \
  -e VITE_MQTT_BROKER_URL=ws://your-broker-url:9001 \
  -e VITE_WEATHER_CITY=Paris \
  solar-home-dashboard
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+
- **MQTT Broker**: Ensure your Mosquitto broker (or similar) is running and has WebSockets enabled (standard port `9001`).

### Installation

1. Clone the repository and navigate into it:
   ```bash
   cd solar-home-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Support

The dashboard uses a multi-stage Dockerfile that builds the production assets via Node.js and serves them using a optimized Nginx Alpine image.

1. **Custom Nginx**: The image includes a custom `nginx.conf` that binds to `0.0.0.0:80` and implements `try_files` for React Router support.
2. **Build and Run**:
   ```bash
   docker build -t solar-home-dashboard .
   docker run -d -p 80:80 solar-home-dashboard
   ```

## 🏗 Project Structure

- `src/components/`: Modular UI units (Battery, Lights, LED, Weather, Layout).
- `src/hooks/`: Custom React 19 hooks for MQTT (sub/pub), Weather data, and sync.
- `src/providers/`: Context providers for MQTT connectivity and React Query.
- `src/styles/`: Design tokens and Tailwind configuration.
- `src/config/`: MQTT topic maps and broker settings.
- `src/lib/`: Reusable utility functions (e.g., `cn` for Tailwind merging).

## 📄 License

This project is for internal home automation use.
