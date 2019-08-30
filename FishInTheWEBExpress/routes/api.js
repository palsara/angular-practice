const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const DB = require('../module/database');

router.use(bodyParser.urlencoded({
  extended: false,
}));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.send('Please set the api endpoint.');
});

router.get('/:entity/:id', async (req, res, next) => {
  const db = new DB(req.params.entity);
  const id = req.params.id || 0;

  const item = await db.find(id);
  res.json(item);
});

router.get('/:entity', async (req, res, next) => {
  const db = new DB(req.params.entity);

  const array = await db.find();
  res.json(array);
});

router.post('/:entity', async (req, res, next) => {
  const db = new DB(req.params.entity);
  const body = req.body;
  const key = Object.keys(body)[0];
  console.log(key);
  const newItem = await db.create(JSON.parse(key));
  res.json(newItem);
});


router.put('/:entity/:id', async (req, res, next) => {
  const db = new DB(req.params.entity);
  const id = req.params.id || 0;
  const body = req.body;
  const key = Object.keys(body)[0];
  console.log(`${id} ${key}`);
  const newObj = await db.update(JSON.parse(id), JSON.parse(key));
  res.json(newObj);
});

router.delete('/:entity/:id', async (req, res, next) => {
  const db = new DB(req.params.entity);
  const id = req.params.id || 0;
  const deleted = await db.delete(id);
  res.send(deleted);
});
module.exports = router;
