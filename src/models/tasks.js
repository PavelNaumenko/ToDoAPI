const driver  = require('../drivers/db');

const COLLECTION = 'tasks';

const create = task => driver.db.collection(COLLECTION).insertOne(task).then(result => result.ops[0]);

const findAllByUserId = id => driver.db.collection(COLLECTION).find({ userId: id });

const findById = id => driver.db.collection(COLLECTION).findOne({ _id: id });

const update = task => driver.db.collection(COLLECTION).updateOne({ _id: task._id }, { $set: task });

const remove = id => driver.db.collection(COLLECTION).findOneAndDelete({_id: id}).then(result => result.value);

module.exports = {
  create,
  findAllByUserId,
  findById,
  update,
  remove,
};
