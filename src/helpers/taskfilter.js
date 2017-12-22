class TaskFilter {
  constructor({ userId, completed, created_at: createdAt = 1, limit = 0, offset = 0 }) {
    this.sort = { created_at: parseInt(createdAt, 10) };
    this.limit = parseInt(limit, 10);
    this.offset = parseInt(offset, 10);
    this.where = { completed, userId };
  }

  _validateCreatedAt(createdAt) {

  }
}

module.exports = TaskFilter;
