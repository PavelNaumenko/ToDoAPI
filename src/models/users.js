const driver = require('../drivers/db');
const bcrypt = require('bcrypt');

const collection = 'users';

const save = (email, password) => bcrypt.hash(password, 10)
  .then(hash => driver.db.collection(collection).insertOne({ email, password: hash }));

const findByEmail = email => driver.db.collection(collection).findOne({ email })
  .then(user => user);

module.exports = {
  save,
  findByEmail,
};
