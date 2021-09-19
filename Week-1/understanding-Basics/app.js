const http = require('http');

const routes = require('./routes')

// req is the request from client, res is response from server
const server = http.createServer(routes.handler);

server.listen(3000);