const driver = require('../drivers/db');
const bcrypt = require('bcrypt');

const collection = 'users';

function saveUser(email, password) {
  return bcrypt.hash(password, 10)
    .then(hash => driver.db.collection(collection).insertOne({ email, password: hash })
      .then(id => id));
}

function login(email, password) {
  return driver.db.collection(collection).findOne({ email, password })
    .then(id => id);
}

function findUser(email) {
  return driver.db.collection(collection).findOne({ email })
    .then(user => user);
}


module.exports = {
  saveUser,
  login,
  findUser,
};
