const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const server = http.createServer(app); // Cria o servidor HTTP
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});