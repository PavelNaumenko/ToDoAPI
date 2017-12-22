class Task {
  constructor({ title, completed = false, userId = null }) {
    this.title = title;
    this.completed = completed;
    this.userId = userId;
    this.created_at = new Date();
  }

  prepareQuery() {

  }
}

module.exports = Task;
