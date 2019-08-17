/*This NodeJS application serves data from MongoDB as an API*/
config = require('./config');
app = require('./app');

const http = require('http');
const port = config.app.port;
const server = http.createServer(app);

server.listen(port);
