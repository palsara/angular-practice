const express = require('express');
const UserDB = require('../module/user');

const db = new UserDB();
const router = express.Router();
const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('register', {
    title: 'Register',
  });
});
router.post('/', async (req, res, next) => {
  const token = getToken();
  console.log(req.body);
  console.log(token);
  await db.create(req.body, token);
  return res.redirect('/');
});

module.exports = router;
