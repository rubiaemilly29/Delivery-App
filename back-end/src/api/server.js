const http = require('http');
const app = require('./app');

const httpServer = http.createServer(app);

require('dotenv').config();

const PORT = process.env.API_PORT || 3001;

httpServer.listen(PORT, () => console.log(' ### ', `Api rodando na porta ${PORT}`));
