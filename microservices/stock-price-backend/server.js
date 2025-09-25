const express = require('express');
const http = require('http');
const WebSocket = require('ws');  // plain WebSocket
const cors = require('cors');
const { router, stock } = require('./routes/priceRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/price', router);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast function to all connected clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Update stock price every 3 seconds
setInterval(() => {
  stock.price = (parseFloat(stock.price) + (Math.random() * 4 - 2)).toFixed(2);
  stock.updatedAt = new Date();

  broadcast(stock);
}, 3000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial stock price
  ws.send(JSON.stringify(stock));

  ws.on('close', () => console.log('Client disconnected'));
});

const PORT = 4300;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
