# Project Setup Guide

## 1. Clone the Repository

First, clone the repository and navigate to the project root directory:

```bash
git clone <repository-url>
cd <project-folder>
2. Install Dependencies

Run the following command to install all required packages:

npm install
3. Run the Development Server

After installation is complete, start the development server:

npm run dev

Once the server starts, open your browser. You will be redirected to the web application.

4. Configure ESP Code
Open the file:
ESP_Code.ino
Enter your Wi-Fi credentials:
SSID (Wi-Fi name)
Password
Enter your PC's IP address.
⚠️ Important Note
The microcontroller (MCU) and your PC must be connected to the same Wi-Fi network.
Otherwise, communication between the ESP device and the web server will not work.
