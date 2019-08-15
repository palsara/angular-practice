const http = require('http');
const path = require('path');
<<<<<<< HEAD
const GetHandler = require('./module/getHandler');

const port = 3210;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  switch (req.method.toLowerCase()) {
    case 'get':
      new GetHandler(req, res);
      break;
    default:
      res.end('invalid method');
=======
const port = 3210;
const GetHandler = require('./module/getHandler');

const server = http.createServer( (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch( req.method.toLowerCase() ) {
    case 'get': new GetHandler(req, res);
    break;
    default: res.end('Invalid method');
>>>>>>> 8273899271466fbc7fbe2762e13e36b2d5a14bd7
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});
