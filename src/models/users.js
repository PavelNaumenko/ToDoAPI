const driver = require('../drivers/db');
const ToDoError = require('../helpers/ToDoError');
const bcrypt = require('bcrypt');

const collection = 'users';

const save = async(email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await driver.db.collection(collection).insertOne({ email, password: hash });
  return user;
};

const findByEmail = async(email) => {
  try {
    const user = await driver.db.collection(collection).findOne({ email });
    console.log(user);
    if (user) {
      return user;
    }
  } catch (err) {
    throw err;
  }
  throw new ToDoError('User not found', 404);
};

module.exports = {
  save,
  findByEmail,
};
