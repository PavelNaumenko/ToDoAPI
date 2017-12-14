const { TaskModel } = require('../models');
const validator = require('../helpers/validators');

const findAll = (req, res, next) => {
  try {
    const filter = validator.validateTaskFilter({ ...req.query, userId: req.userId });
    TaskModel.findAllByUserId(filter)
      .then(tasks => res.status(200).json(tasks))
      .catch(err => next(err));
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const findById = (req, res, next) => {
  const _id = req.params.id;
  if (validator.isValidId(_id)) {
    TaskModel.findById({ _id, userId: req.userId })
      .then((task) => {
        if (task) {
          res.status(201).json(task);
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      })
      .catch(err => next(err));
  } else {
    res.status(400).json({ message: '_id must be a string of 24 hex characters' });
  }
};

const create = (req, res, next) => {
  const { _id, title, completed = false } = req.body;
  const task = {
    _id, title, completed, userId: req.userId,
  };
  try {
    validator.validateTask(task);
    TaskModel.create(task)
      .then((result) => {
        res.json(result);
      })
      .catch(err => next(err));
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const update = (req, res, next) => {
  try {
    const body = validator.validateEditedTask(req.body);
    TaskModel.update({ _id: req.params.id, userId: req.userId, task: body })
      .then(result => res.json({ message: `Saved ${result.modifiedCount} items` }))
      .catch(err => next(err));
  } catch (err) {
    res.status(403).json({ message: err.message });
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
  filter.userId = req.userId;
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
