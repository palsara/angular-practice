const urlParser = require('url');
const DB = require('./db');

module.exports = class PostHandler {
  constructor(req, res) {

    // Example: /orders/7 => ["", "orders", "7"]
    const parsedUrl = urlParser.parse(req.url);
    const reqParams = parsedUrl.pathname.split('/');

    const db = new DB(reqParams[1]);
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      const response = await db.create(JSON.parse(data));
      res.end(JSON.stringify(response));
    });
  }
};
