const { MongoClient } = require('mongodb');


let instance = null;

class Db {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  connect(connStr) {
    return MongoClient.connect(connStr)
      .then((db) => {
        this.db = db;
      })
      .catch(err => console.log(err));
  }

  disconnect() {
    this.db = null;
  }
}

const db = new Db();
module.exports = db;
