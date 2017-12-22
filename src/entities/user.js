const Validator = require('../helpers/validator');
const ToDoError = require('../helpers/todoerror');
const bcrypt = require('bcrypt');


class User {
  constructor({ email, password }) {
    User._validateEmail(email);
    User._validatePassword(password);
    this.email = email;
    this.password = password;
  }

  static _validateEmail(email) {
    if (!Validator.required(email)) {
      throw new ToDoError('Email required', 401);
    }
    if (!Validator.isEmail(email)) {
      throw new ToDoError('Invalid email', 401);
    }
  }

  static _validatePassword(password) {
    if (!Validator.required(password)) {
      throw new ToDoError('Password required', 401);
    }
  }

  async comparePassword(hash) {
    const isCompare = await bcrypt.compare(this.password, hash);
    if (!isCompare) {
      throw new ToDoError('Wrong email or password', 401);
    }
    return true;
  }
}


module.exports = User;
