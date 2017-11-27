const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb').MongoClient;
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', auth);

MongoClient.connect('mongodb://localhost:27017/users', (err, db) => {
  if (err) { throw err; }
  app.locals.db = db;
  app.listen(8080);
});

