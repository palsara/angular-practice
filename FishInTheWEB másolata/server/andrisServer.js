const http = require('http');
const fs = require('fs');
const path = require('path');
const PostHandler = require('./module/posthandler');
const GetHandler = require('./module/getHandler');
const DeleteHandler = require('./module/deleteHandler');
const PutHandler = require('./module/putHandler');

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PUT, POST');

  switch (req.method.toLowerCase()) {
    case 'get':
      new GetHandler(req, res);
      break;
    case 'post':
      new PostHandler(req, res);
      break;
    case 'delete':
      new DeleteHandler(req, res);
      break;
    case 'put':
      new PutHandler(req, res);
      break;
    default:
      res.end('Invalid method');
  }
});

server.listen(port, () => {
  console.log(`server is listening on port: ${port}.`);
});
