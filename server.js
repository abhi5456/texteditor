const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sameText = '';

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { type, data } = JSON.parse(message);
    if (type === 'textUpdate') {
      sameText = data;
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'textUpdate', data: sameText }));
        }
      });
    }
  });
  ws.send(JSON.stringify({ type: 'textUpdate', data: sameText }));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
