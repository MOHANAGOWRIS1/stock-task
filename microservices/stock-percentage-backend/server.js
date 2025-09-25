const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { router, updateFund, getFund } = require("./router/stockRouter");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// REST API route
app.use("/fund", router);

// WebSocket for live updates
wss.on("connection", (ws) => {
  console.log("Client connected for HDFC Flexi Cap NAV");

  const interval = setInterval(() => {
    updateFund(); // update NAV
    ws.send(JSON.stringify(getFund())); // push to client
  }, 5000); // every 5s

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// Start server
const PORT = 4008;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌐 REST API: GET http://localhost:${PORT}/fund`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});
