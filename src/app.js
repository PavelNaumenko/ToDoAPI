const express = require('express');
const bodyParser = require('body-parser');
const { DB_STRING, PORT } = require('../config');
const db = require('./drivers/db');
const router = require('./api');
const errorHandler = require('./middlewares/errorHandler');
const debug = require('debug')('todo:server');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(router);
app.use(errorHandler);

db.connect(DB_STRING)
  .then(() => app.listen(PORT, () => debug(`Server listening on port: ${PORT}`)));