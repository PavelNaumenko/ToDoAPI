const MongoClient = require('mongodb').MongoClient;

const connString = 'mongodb://localhost:27017/todo';

let instance = null;

class Db {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    connect() {
        return MongoClient.connect(connString)
            .then(db => {
                instance.db = db;
            })
            .catch(err => console.log(err));
    }
}

const db = new Db();
module.exports = db;
