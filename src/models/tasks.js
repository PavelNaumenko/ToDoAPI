const driver = require('../drivers/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'tasks';

const create = task => driver.db.collection(COLLECTION).insertOne({ ...task, _id: new ObjectId() })
  .then(result => result.ops[0]);

const findAllByUserId = id => driver.db.collection(COLLECTION)
  .find({ userId: id }, { _id: 1, title: 1, completed: 1 })
  .toArray();

const findById = id => driver.db.collection(COLLECTION)
  .findOne({ _id: new ObjectId(id) }, { _id: 1, title: 1, completed: 1 });

const update = task => driver.db.collection(COLLECTION).updateOne({ _id: new ObjectId(task.id) }, { $set: task });

const remove = id => driver.db.collection(COLLECTION).findOneAndDelete({ _id: new ObjectId(id) }).then(result => result.value);

const validate = (task) => {
  console.log(task);
  const { title, completed = false, id } = task;
  if (typeof title !== 'string') {
    console.log('title');
    return false;
  }
  if (typeof completed !== 'string' || !(completed === 'true' || completed === 'false')) {
    console.log('compl');
    return false;
  }
  if (id) {
    const tmp = parseInt(id, 16);
    if (tmp.toString(16) !== id.toLowerCase()) {
      return true;
    }
  }
  return true;
};

module.exports = {
  create,
  findAllByUserId,
  findById,
  update,
  remove,
  validate,
};
