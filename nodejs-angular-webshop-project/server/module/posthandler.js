const urlParser = require('url');
const DB = require('./db');

module.exports = class PostHandler {
  constructor(req, res) {
    // Example: /orders/7 => ["", "orders", "7"]
    const parsedUrl = urlParser.parse(req.url);
    const reqParams = parsedUrl.pathname.split('/'); // kérés paramétereit tárolja tömbben

    // Beolvassa az orders.json-t
    const db = new DB(reqParams[1]);
    // Megnézzük, a kérésnek van e 2-es indexű paramétere(id-je), ha nincs, az összeset visszaadja
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      const data = await db.create(JSON.parse(data));
      res.end(JSON.stringify(data));
    });
  }
};
