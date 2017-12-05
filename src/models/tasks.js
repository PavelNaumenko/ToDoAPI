const { db } = require('../drivers/db');

const COLLECTION = 'tasks';

const create = task => db.collection(COLLECTION).insertOne(task);

const findAllByUserId = id => db.collection(COLLECTION).find({ userId: id });

const findById = id => db.collection(COLLECTION).findOne({ _id: id });

const update = task => db.collection(COLLECTION).updateOne({ _id: task._id }, { $set: task });

const remove = task => db.collection(COLLECTION).remove(task);

module.exports = {
  create,
  findAllByUserId,
  findById,
  update,
  remove,
};
