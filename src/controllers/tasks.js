const { TaskModel } = require('../models');

const findAll = (req, res, next) => {
  TaskModel.findAllByUserId(req.app.locals.userId)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  const { id, title, completed = false } = req.body;
  TaskModel.create({ id, title, completed })
    .then(res.status(201).end())
    .catch(err => next(err));
};

const update = (req, res) => {

};

const remove = (req, res) => {

};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
