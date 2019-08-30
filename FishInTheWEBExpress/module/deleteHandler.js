
const fs = require('fs');
const DB = require('./database');

module.exports = class DeleteHandler {
  constructor(req, res) {
    const reqParams = req.url.split('/');
    
    const ordersDB = new DB(reqParams[1]);
    const id = reqParams[2] || 0;

    ordersDB.delete(id);
    res.end();
  }
};


