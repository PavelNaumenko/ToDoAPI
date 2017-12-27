const driver = require('../drivers/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'tasks';

const create = async (task) => {
  const result = await driver.db.collection(COLLECTION).insertOne({
    ...task,
    _id: new ObjectId(task._id),
    created_at: new Date(),
  });
  return result.ops[0];
};

const findAllByUserId = ({ where, limit, offset, sort }) => driver.db.collection(COLLECTION)
  .find(where, { _id: 1, title: 1, completed: 1, created_at: 1 })
  .skip(offset)
  .limit(limit)
  .sort(sort)
  .toArray();

const findById = ({ _id, userId }) => driver.db.collection(COLLECTION)
  .findOne({ _id, userId }, { _id: 1, title: 1, completed: 1, created_at: 1 });

const update = task => driver.db.collection(COLLECTION)
  .updateOne({ _id: task._id, userId: task.userId }, {
    $set: {
      title: task.title,
      completed: task.completed,
    },
  });

const remove = async ({ _id }) => {
  const result = await driver.db.collection(COLLECTION).findOneAndDelete({ _id });
  return result.value;
};

const removeAll = filter => driver.db.collection(COLLECTION).deleteMany(filter);

module.exports = {
  create,
  findAllByUserId,
  findById,
  update,
  remove,
  removeAll,
};
