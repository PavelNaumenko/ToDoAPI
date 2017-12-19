const driver = require('../drivers/db');
const ToDoError = require('../helpers/todoerror');
const bcrypt = require('bcrypt');

const collection = 'users';

const save = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await driver.db.collection(collection).insertOne({ email, password: hash });
  return user;
};

// const findByEmail = async (email) => {
//   const user = await driver.db.collection(collection).findOne({ email });
//   return new Promise((resolve, reject) => {
//     if (user) {
//       resolve(user);
//     } else {
//       reject(new ToDoError('User not found', 404));
//     }
//   });
// };

const findByEmail = email => driver.db.collection(collection).findOne({ email });

const isDuplicateUser = async ({ email }) => {
  const user = await driver.db.collection(collection).findOne({ email });
  if (user) throw new ToDoError('User exist', 404);
};

module.exports = {
  save,
  findByEmail,
  isDuplicateUser,
};
