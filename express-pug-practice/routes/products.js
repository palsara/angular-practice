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

router.get('/new', async (req, res, next) => {
    res.render('new-product');
});

// Create new product.
router.post('/', async (req, res, next) => {
    let result = await db.create(req.body);
    res.redirect('/products');
});

router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id || 0;
    await db.delete(id);
    res.redirect('/products');
});


router.get('/edit/:id', async (req, res, next) => {
    let id = req.params.id || 0;
    let data = await db.readOne(id);
    console.log(data[0]);
    res.render('edit-product', {
        product: data[0],
    })
})

router.post('/:id', async (req, res, next) => {
    let id = req.params.id || 0;
    await db.update(id, req.body)
    res.redirect('/products');
})


module.exports = router;