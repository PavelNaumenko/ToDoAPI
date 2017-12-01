const { driver } = require('../drivers/db');

function saveUser(email, password) {
  return driver.db.collection('users').insertOne({ email, password })
    .then(id => id);
}

function findUser(email, password) {
  return driver.db.collection('users').findOne({ email, password })
    .then(id => id);
}


module.exports = {
  saveUser,
  findUser,
};
