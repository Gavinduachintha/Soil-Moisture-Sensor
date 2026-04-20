#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "localhost11g";
const char* password = "Lagare@123";
const char* serverUrl = "http://192.168.145.97:3000/data";

#define uS_TO_S_FACTOR 1000000ULL

void setup() {
  Serial.begin(9600);

  // 1. Connect WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // 2. Read sensor
  int sensorValue = analogRead(A0);

  // 3. Send data to backend
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"moisture\":" + String(sensorValue) + "}";
    http.POST(json);

    http.end();
  }

  // 4. Sleep for 10 minutes
  // esp_sleep_enable_timer_wakeup(10 * 60 * uS_TO_S_FACTOR);

  // Serial.println("Going to sleep now...");
  // Serial.flush();

  // esp_deep_sleep_start();
}

void loop() {
  // not used
}
