# IoT Soil Moisture Monitor

A full-stack soil moisture monitoring project that pairs an ESP32 sensor node with a Next.js dashboard. The device posts moisture readings to a simple API, and the web UI displays the current value and a history chart with a modern, responsive design.

## Features

- Real-time soil moisture meter
- Historical chart (last 24 readings kept in memory)
- REST API endpoint for ingesting and fetching sensor data
- Responsive dashboard UI built with the Next.js App Router
- Mock data initialized on first load for easy local testing

## Architecture

1. **ESP32** reads the analog moisture sensor.
2. The device **POSTs** readings to the Next.js API (`/api/data`).
3. The API stores readings in memory and exposes them via **GET**.
4. The dashboard polls the API every 30 seconds to update the UI.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Recharts (for the chart component)

## Getting Started (Web App)

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## API Usage

- **GET** `/api/data`
  - Returns current moisture, history, and last update time.
- **POST** `/api/data`
  - Body: `{ "moisture": number }` (0–100)

The API keeps data in memory only; a restart resets history.

## ESP32 Firmware

The Arduino sketch lives in `ESP_Code.ino` and:

- Connects to Wi‑Fi
- Reads the sensor from analog pin A0
- Sends JSON to the server URL

Update the following before uploading:

- `ssid` / `password`
- `serverUrl` (point to your Next.js host and `/api/data`)

## Project Structure

```
app/                Next.js App Router pages + API
components/         Dashboard UI components
ESP_Code.ino        ESP32 firmware sketch
```

## Notes

- The Weather widget is present but currently commented out in the dashboard.
- For production, replace in-memory storage with a database or IoT platform.
