const express = require('express');
const bodyParser = require('body-parser');
const {dbString, port} = require('../config');
const db = require('./drivers/db');
const router = require('./api');
const debug = require('debug')('todo:server');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(router);

db.connect(dbString)
  .then(() => app.listen(port, () => debug(`Server listening on port: ${port}`)));

