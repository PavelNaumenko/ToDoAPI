const {TaskModel} = require('../models');
const ObjectId = require('mongodb').ObjectId;

const findAll = (req, res, next) => {
  // TaskModel.findAllByUserId(req.app.locals.userId)
  //   .then(tasks => res.status(200).json(tasks))
  //   .catch(err => next(err));
};

const findById = (req, res, next) => {
  const id = new ObjectId(req.params.id);
  TaskModel.findById(id)
    .then(task => {
      if (task) {
        res.status(201).json(task);
      } else {
        res.status(404).json({message: 'Task not found'})
      }
    })
    .catch(err => next(err))
};

const create = (req, res, next) => {
  const {id, title, completed = false} = req.body;
  TaskModel.create({_id: new ObjectId(id), title, completed})
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => next(err));
};

const update = (req, res) => {

};

const remove = (req, res, next) => {
  const id = new ObjectId(req.params.id);
  TaskModel.remove(id)
    .then(task => {
      if(task){
        res.status(200).json(task);
      }else{
        res.status(404).json({message: 'Task not found'});
      }
    })
    .catch(err => next(err))
};

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
};
