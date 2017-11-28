const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb').MongoClient;
const db = require('./drivers/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect()
    .then(() => {
        app.listen(8080);
        console.log(db);
    });
