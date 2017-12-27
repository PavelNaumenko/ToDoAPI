const Validator = require('../helpers/validator');
const ToDoError = require('../helpers/todoerror');
const { ObjectId } = require('mongodb');


class Task {
  constructor({ _id, title, completed, userId }) {
    this.title = title;
    if (completed !== 'undefined') {
      this.completed = completed;
    }
    this.userId = userId;
    this.created_at = new Date();
    if (_id) {
      if (!Validator.isId(_id)) {
        throw new ToDoError('_id must be a string of 24 hex characters', 400);
      }
      this._id = new ObjectId(_id);
    }
  }

  prepareQuery({ userId, created_at: createdAt = 1, limit = 0, offset = 0 }) {
    this.query = {};
    if (!Validator.isInt(createdAt)) {
      throw new ToDoError(`created_at except integer but got ${typeof createdAt}`, 400);
    }
    if (Math.abs(parseInt(createdAt, 10)) !== 1) {
      throw new ToDoError(`created_at expected 1 or -1 but got ${createdAt}`, 400);
    }
    this.query.sort = { created_at: parseInt(createdAt, 10) };
    if (!Validator.isInt(limit)) {
      throw new ToDoError(`limit except integer but got ${typeof createdAt}`, 400);
    }
    this.query.limit = parseInt(limit, 10);
    if (!Validator.isInt(offset)) {
      throw new ToDoError(`offset except integer but got ${typeof createdAt}`, 400);
    }
    this.query.offset = parseInt(offset, 10);
    this.query.where = { userId };
    if (Validator.isBool(this.completed)) {
      const completed = this.completed === 'true';
      this.query.where = { ...this.query.where, completed };
    }
    return this.query;
  }
}

module.exports = Task;
