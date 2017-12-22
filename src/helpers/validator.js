const ToDoError = require('../helpers/todoerror');

const required = item => !!item;

const isEmail = email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);

const isId = _id => /^[0-9a-fA-F]{24}$/.test(_id);

const isStr = str => typeof str === 'string';

const isBool = str => typeof str === 'boolean' || str === 'true' || str === 'false';

const isFound = (obj, kind) => {
  if (!obj) {
    throw new ToDoError(`${kind} not found`, 404);
  }
};

module.exports = {
  required,
  isEmail,
  isId,
  isStr,
  isBool,
};
