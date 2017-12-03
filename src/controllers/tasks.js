const { TaskModel } = require('../models');

const findAll = (req, res, next) => {
  TaskModel.findAllByUserId(req.app.locals.userId)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => next(err));
};

const create = (req, res) => {
  TaskModel.create()
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
