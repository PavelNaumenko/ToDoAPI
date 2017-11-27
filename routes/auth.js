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
  req.app.locals.db.collection('users').findOne({ email, pasword: password }, (err, item) => {
    if (err) {
      res.json({ error: 'User not exist' });
    }
    res.json({
      token: jwt.sign({ id: item._id }, secret),
    });
  });
  res.status(404);
});

router.post('/sign_up', (req, res) => {
  const { email, password } = req.body;
  const { db } = req.app.locals.db;
  db.collection('users').findOne({ email, password }, (error, item) => {
    if (error) {
      res.json({ error: 'error' });
    }

    if (item) {
      res.json({
        token: jwt.sign({ id: item._id }, secret),
      });
    } else {
      db.collection('users').insertOne({
        email,
        password,
      }, (err, inserted) => {
        if (err) {
          res.json({ error: 'Insert error' });
        }
        res.json({
          token: jwt.sign({ id: inserted.insertedId }, secret),
        });
      });
    }
  });
});

router.get('/', (req, res) => {
  res.json(req.token);
});

module.exports = router;
