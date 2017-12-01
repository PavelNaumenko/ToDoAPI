const express = require('express');
const bodyParser = require('body-parser');
const { dbString, port } = require('../config');
const db = require('./drivers/db');
const router = require('./api').userRouter;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect(dbString)
  .then(() => {
    app.use(router);
    app.listen(port);
  });

