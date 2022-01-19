const http = require('http');
const cors = require('cors');
const socket = require('socket.io')
const app = require('./app');

app.use(cors());


const httpServer = http.createServer(app);

require('dotenv').config();

const PORT = process.env.API_PORT || 3001;

httpServer.listen(PORT, () => console.log(' ### ', `Api rodando na porta ${PORT}`));

 const io = socket(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
  });


io.on('connection', (socket) => {
  socket.on('sale', (sale) => {
    console.log(sale);
  socket.broadcast.emit('sale', sale)
  })
})
