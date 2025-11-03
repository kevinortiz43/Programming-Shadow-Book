// http package is used for establishing remote connections 
// to a server or to create a server which listens to client.

// createServer - Takes a requestListener, a function which takes request and response parameters, where request is the handle to the request from the client and response is the handle to be sent to the client.


const http = require('http');
const requestListener = function(req, res) {
 res.writeHead(200);
 res.end('Hello, World!');
}
const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: '+ port);
server.listen(port);
