const express = require('express');
const UserDB = require('../module/user');

const db = new UserDB();
const router = express.Router();
const getToken = (l = 20) => {
  const result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};
/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
});

router.post('/', async (req, res, next) => {
  const result = await db.login(req.body);
  if (result.length === 1) {
    res.cookie('uuid', getToken);
    res.redirect('/');
  }
  res.render('login');
});

module.exports = router;
