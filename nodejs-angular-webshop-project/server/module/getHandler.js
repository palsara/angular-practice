const DB = require('./db');


module.exports = class GetHandler {
  constructor(req, res) {
    const reqParams = req.url.split('/');
    const id = reqParams[2] || 0;
    const ordersDB = new DB(reqParams[1]); // létrehozok egy új DB-t, lefut a constructora
    ordersDB.find(id).then(
      data => res.end(JSON.stringify(data)),
      (err) => {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
      },
    );
  }
};
