const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb').MongoClient;
const auth = require('./routes/auth');

const app = express();

app.use((req, res, next) => {
  MongoClient.connect('mongodb://test:test@ds055852.mlab.com:55852/todo', (err, db) => {
    if (err) {
      throw err;
    }
    req.db = db;
    next();
  });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', auth);

app.listen(80);
