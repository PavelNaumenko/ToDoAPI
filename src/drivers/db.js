const MongoClient = require('mongodb').MongoClient;

const connString = 'mongodb://localhost:27017/todo';

class Db {
    constructor() {}

    connect(connStr){
        let self = this;
        MongoClient.connect(connString)
            .then(db => {
                self.db = db;
            })
            .catch(err => console.log(err));
    }

     get() {
        return this.db;
    }
}

const db = new Db();
module.exports = db;


// // app.js
//
// const dp = require('db');
//
// db.connect()
// .then(() => {
//     app.listen(80)
// });
//
// //
//
// const dp = require('db');
//
// db.get();