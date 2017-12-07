const { TaskModel } = require('../models');

const findAll = (req, res, next) => {
  const {
    limit, offset, completed, created_at,
  } = req.query;
  const { userId } = req.app.locals;
  const filter = { userId };
  if (completed) {
    filter.completed = completed;
  }
  if (created_at !== '-1' && created_at !== '1') {
    res.status(403).json({ message: 'Bad sort specification ' });
    return;
  }
  TaskModel.findAllByUserId(filter, limit, offset, created_at)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => next(err));
};

const findById = (req, res, next) => {
  TaskModel.findById(req.params.id)
    .then((task) => {
      if (task) {
        res.status(201).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => next(err));
};

const create = (req, res, next) => {
  const { id, title, completed = false } = req.body;
  if (TaskModel.validate({ id, title, completed })) {
    TaskModel.create({
      _id: id, title, completed, userId: req.app.locals.userId,
    })
      .then((result) => {
        res.json(result);
      })
      .catch(err => next(err));
  } else {
    res.status(403).json({ message: 'Invalid input data' });
  }
};

const update = (req, res, next) => {
  const { title, completed = false } = req.body;
  if (TaskModel.validate({ id: req.params.id, title, completed })) {
    TaskModel.update({
      _id: req.params.id, title, completed, userId: req.app.locals.userId,
    })
      .then(result => res.json(result))
      .catch(err => next(err));
  } else {
    res.status(403).json({ message: 'Invalid input data' });
  }
};

const remove = (req, res, next) => {
  TaskModel.remove(req.params.id)
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => next(err));
};

const removeAll = (req, res, next) => {
  const { filter = {}, completed } = req.query;
  if (completed) {
    filter.completed = completed;
  }
  TaskModel.removeAll(filter)
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    })
    .catch(err => next(err));
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
  removeAll,
};
