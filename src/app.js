const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb').MongoClient;
const db = require('./drivers/db');
const router = require('./api').userRouter;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect()
    .then(() => {
        app.use(router);
        app.listen(8080);
    });

