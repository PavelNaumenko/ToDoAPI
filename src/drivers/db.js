const { MongoClient } = require('mongodb');

class Db {
  constructor() {}

  connect(connStr) {
    return MongoClient.connect(connStr)
      .then((db) => this.db = db)
      .catch(err => console.log(err));
  }

  disconnect() {
    this.db = null;
  }
}

module.exports = new Db();
