# Lesson 4
During our last lesson, we learned basics about **webhooks** and **websockets**, **JavaScript's fetch-function**, and\
**Google charts**.\
We made a complete **IoT-pipeline**:\
**Pico W measures temperature and humidity with dht22** -> **Sends it to ThingSpeak backend with POST request to API**\
-> **Frontend made with Google charts fetches data and visualizes it in line chart**.

## Dependencies
For **Webhook**, you have to install **express**:

```powershell
npm install express
```
And start the server with:

```powershell
node server.js
```

And for **Websocket**, you have to install **ws**:

```powershell
npm install ws
```

Start the server:

```powershell
node server2.js
```

And open the client.html with **live server** or from **file explorer**.

