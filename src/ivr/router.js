const Router = require('express').Router;
const {welcome, menu, recordVoiceMail} = require('./handler');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
});

// POST: /ivr/recordVoiceMail
router.post('/recordVoiceMail', (req, res) => {
  const digit = req.body.Digits;
  res.send(recordVoiceMail(digit));
});

module.exports = router;