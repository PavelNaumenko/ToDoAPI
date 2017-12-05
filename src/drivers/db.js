const { MongoClient } = require('mongodb');

class Db {
  connect(connStr) {
    return MongoClient.connect(connStr)
      .then((db) => { this.db = db; })
      .catch(err => err);
  }

  disconnect() {
    this.db.disconnect();
  }
}

module.exports = new Db();
