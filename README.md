# Soil Moisture Sensor Dashboard

A simple IoT project that reads soil moisture from an ESP32 and visualizes it in a Next.js dashboard.

## Overview

This repository contains:

- **Firmware** (`ESP_Code.ino`) for an ESP32 board
- **Web app** (Next.js 16) that provides:
  - a dashboard UI
  - an API endpoint to receive and serve moisture data

The ESP32 sends moisture data over Wi-Fi using HTTP POST requests. The dashboard polls the API and renders the latest value plus recent history.

## Features

- ESP32 Wi-Fi data upload via HTTP
- API route for ingesting moisture data (`POST /api/data`)
- API route for dashboard reads (`GET /api/data`)
- Real-time-style dashboard refresh (every 30 seconds)
- Moisture gauge + history chart
- In-memory history (last 24 points)

## Architecture

```mermaid
flowchart LR
  S[Soil Moisture Sensor\n(Analog OUT)] --> E[ESP32\nESP_Code.ino]
  E -->|HTTP POST JSON\n/api/data| N[Next.js API Route\napp/api/data/route.ts]
  N -->|GET /api/data| D[Dashboard\ncomponents/Dashboard.tsx]
  D --> U[Browser UI]
```

## Hardware Requirements

- ESP32 development board (Arduino framework)
- Analog soil moisture sensor module
- Jumper wires
- USB cable for flashing ESP32

### Wiring (typical)

| Sensor pin | ESP32 pin | Notes |
|---|---|---|
| VCC | 3V3 | Use 3.3V where possible |
| GND | GND | Common ground required |
| AO (analog out) | A0 (analog input) | `ESP_Code.ino` reads `analogRead(A0)` |

> The exact GPIO label for `A0` depends on your ESP32 board variant. On many boards, this maps to an ADC pin such as GPIO36 (VP).

## Software Prerequisites

### Firmware

- Arduino IDE 2.x (or PlatformIO)
- ESP32 board package installed in Arduino IDE
- Libraries used by firmware:
  - `WiFi.h`
  - `HTTPClient.h`

### Web Application

- Node.js 20+
- npm

## Setup

### 1) Clone repository

```bash
git clone https://github.com/Gavinduachintha/Soil-Moisture-Sensor.git
cd Soil-Moisture-Sensor
```

### 2) Web app setup (backend + frontend)

```bash
npm install
npm install recharts
npm run dev
```

Open: `http://localhost:3000`

### 3) Firmware setup and flashing

Open `ESP_Code.ino` and update these values:

```cpp
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://<YOUR_PC_LAN_IP>:3000/api/data";
```

Then:

1. Select your ESP32 board and serial port in Arduino IDE.
2. Compile and upload.
3. Open Serial Monitor (9600 baud) to verify Wi-Fi connection logs.

## Configuration Notes

- **Wi-Fi**: ESP32 and your computer must be on the same local network.
- **Server URL**: use your computer's LAN IP, not `localhost`.
- **Endpoint path**: the Next.js API route is `/api/data`.
- **Payload format** expected by API:

```json
{ "moisture": 55 }
```

- API validation currently accepts moisture values **0-100**.

## Usage

1. Start the Next.js app with `npm run dev`.
2. Power/reset the ESP32 after upload.
3. Confirm POSTs are reaching the API (terminal logs / browser network tab).
4. Open the dashboard and verify the gauge + chart update.

## Troubleshooting

### `400 Invalid moisture value. Must be between 0-100.`

The API expects percentage-style values (0-100). If your sensor returns raw ADC values (for example 0-4095), convert or calibrate the value in firmware before sending.

### ESP32 does not connect to Wi-Fi

- Recheck SSID/password.
- Ensure 2.4 GHz Wi-Fi is available for ESP32.
- Check Serial Monitor output.

### Dashboard shows only mock/historical-looking data

Data is stored **in memory** in `app/api/data/route.ts`. Restarting the Next.js server resets history and reseeds mock data.

### Cannot reach server from ESP32

- Verify `serverUrl` uses your PC's LAN IP and port `3000`.
- Ensure firewall allows inbound connections to Node/Next.js dev server.

## API Summary

- `POST /api/data` — receives moisture JSON and appends history
- `GET /api/data` — returns current moisture + history for UI

## Contributing

Contributions are welcome. Please open an issue first for major changes, then submit a pull request.

## License

No license file is currently present in this repository.
