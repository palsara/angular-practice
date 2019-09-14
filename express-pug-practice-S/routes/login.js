const express = require('express');

const router = express.Router();
const UserDB = require('../module/user');

const db = new UserDB();

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
  res.render('login', {
    title: 'Express',
  });
});

router.post('/', async (req, res, next) => {
  const result = await db.login(req.body);
  if (result.length === 1) {
    let token = getToken();
    res.cookie('uuid', token);
    await db.setUserToken(result[0].id, token);
    return res.redirect('/');
  }
  res.render('login', {
    wrong: 'Incorrect email or password',
  });
});

module.exports = router;