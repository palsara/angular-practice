var express = require('express');
var router = express.Router();
const DB = require('../module/db');
const db = new DB();
/* GET home page. */
router.get('/', async (req, res, next) => {
    // const products = await db.mockData();

    let realData = await db.read();
    console.log(realData);

    res.render('products', {
        title: 'Products',
        products: realData,
    });
});
module.exports = router;
