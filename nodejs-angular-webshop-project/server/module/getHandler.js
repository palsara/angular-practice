const urlParser = require('url');
const DB = require('./db');

module.exports = class GetHandler {
  constructor(req, res) {
    // Example: /orders/7 => ["", "orders", "7"]
    const parsedUrl = urlParser.parse(req.url);
    const reqParams = parsedUrl.pathname.split('/'); // kérés paramétereit tárolja tömbben

    // Beolvassa az orders.json-t
    const ordersDB = new DB(reqParams[1]);
    // Megnézzük, a kérésnek van e 2-es indexű paramétere(id-je), ha nincs, az összeset visszaadja
    const id = reqParams[2] || 0;
    ordersDB.find(id, parsedUrl.query).then(
      data => res.end(JSON.stringify(data)),
      (err) => {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
      },
    );
  }
};
