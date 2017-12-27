const TaskModel = require('../models/tasks');
const Task = require('../entities/task');
const Validator = require('../helpers/validator');

const findAll = async (req, res, next) => {
  try {
    const task = new Task(req.query);
    const query = task.prepareQuery({ ...req.query, userId: req.userId });
    const tasks = await TaskModel.findAllByUserId(query);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const task = new Task({ _id: req.params.id, userId: req.userId });
    const result = await TaskModel.findById(task);
    Validator.isFound(result, 'Task');
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    const result = await TaskModel.create(task);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId, _id: req.params.id });
    const result = await TaskModel.update(task);
    res.json({ message: `Saved ${result.modifiedCount} items` });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const task = new Task({ _id: req.params.id });
    const result = await TaskModel.remove(task);
    Validator.isFound(result, 'Task');
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const removeAll = async (req, res, next) => {
  try {
    const { filter = { userId: req.userId }, completed } = req.query;
    if (completed) {
      filter.completed = completed;
    }
    const result = await TaskModel.removeAll(filter);
    Validator.isFound(result, 'Tasks');
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
  removeAll,
};
