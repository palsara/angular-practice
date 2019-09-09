const fs = require('fs');
const DB = require('./database');

module.exports = class PutHandler {
  constructor(req, res) {
    const reqParams = req.url.split('/');

    let body = '';
    const ordersDB = new DB(reqParams[1]);
    req.on('data', (data) => {
      body += data.toString();
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      ordersDB.edit(parsedBody).then(
        () => res.end(),
        (err) => {
          res.statusCode = 404;
          res.end(JSON.stringify(err));
        },
      );
    });
  }
};
