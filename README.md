# Ride-Share Real-Time Location Service

This project implements a WebSocket server that allows drivers to submit their real-time location updates and clients to subscribe and receive live driver location data and basic info.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)  
- npm

---

## 💻 Installation

```bash
npm install
npm install -g nodemon

```

## 🏁 Running the Server
```bash
npm run dev

```
The server will be available at:
http://localhost:3000


## ✅ Testing the Application
1. 🔐 Login as a Driver
   Send a POST request to: POST http://localhost:3000/login
   ```json
   {
    "username": "driver1",
    "password": "pass1"
   }
   ```
   Response:
   Returns a JWT access token for authentication.
   
2. 📍 Submit Driver Location Update
   Send a POST request to: POST http://localhost:3000/driver/update
   ```json
   {
    "lat": 40.7128,
    "long": 74.0060
   }
   ```
   Make sure to include the access token for authorization, as required by your API.
   
3. 🧪 Test Real-Time Location Updates via WebSocket
   Two sample HTML files are provided for client testing:

      client-without-mid-session.html — basic test client
      
      client-with-mid-session-refresh.html — handles mid-session token expiration
    
   Testing Steps:
     - Open client-without-mid-session.html in your browser.
  
     - Update the accessToken variable in the script with the JWT token obtained from the login endpoint.
  
     - Open your browser's developer console to view connection status, real-time driver location updates, and error messages.

## 🛠️ Notes
  The server disconnects WebSocket connections if the access token expires mid-session, prompting clients to reconnect or refresh the token.

  Clients can switch the driver they are subscribed to by sending a subscription event over the existing WebSocket connection.

  The system supports multiple backend instances via a pub/sub mechanism for broadcasting driver updates (mocked implementation included).

