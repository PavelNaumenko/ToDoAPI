const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secret = 'test123';


router.use((req, res, next) => {
  if (req.url !== '/sign_up') {
    jwt.verify(req.get('authorization'), secret, (err, decoded) => {
      if (err) {
        res.json({ error: 'Invalid token' });
      }
      req.token = decoded;
    });
  }
  next();
});

router.post('/sign_in', (req, res) => {
  const { email, password } = req.body;
  req.db.collection('users').findOne({ email, pasword: password }, (err, item) => {
    if (err) {
      res.json({ error: 'error' });
    }
    res.json({
      token: jwt.sign({ id: item._id }, secret),
    });
  });
  res.status(404);
});

router.post('/sign_up', (req, res) => {
  const { email, password } = req.body;
  req.findOne({ email: email, password: password }, (error, item) => {
    if (error) {
      res.json({ error: 'error' });
    }
    if (item) {
      res.json({ error: 'Email exist' });
    } else {
      req.db.collection('users').insertOne({
        email: email,
        password: password,
      }, (err, inserted) => {
        if (err) {
          res.json({ error: 'Insert error' });
        }
        res.json({
          token: jwt.sign({ id: inserted._id }, secret),
        });
      });
    }
  });
});

module.exports = router;
