const driver = require('../drivers/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'tasks';

const create = task => driver.db.collection(COLLECTION).insertOne({
  ...task,
  _id: new ObjectId(task._id),
  created_at: Date.now(),
})
  .then(result => result.ops[0]);

const findAllByUserId = (filter, limit = 0, offset = 0, sort = 1) => driver.db.collection(COLLECTION)
  .find(filter, {
    _id: 1, title: 1, completed: 1, created_at: 1,
  })
  .skip(parseInt(offset, 10))
  .limit(parseInt(limit, 10))
  .sort({ created_at: parseInt(sort, 10) })
  .toArray();

const findById = id => driver.db.collection(COLLECTION)
  .findOne({ _id: new ObjectId(id) }, { _id: 1, title: 1, completed: 1 });

const update = task => driver.db.collection(COLLECTION).updateOne({ _id: new ObjectId(task._id) }, {
  $set: {
    ...task,
    _id: new ObjectId(task._id),
  },
});

const remove = id => driver.db.collection(COLLECTION)
  .findOneAndDelete({ _id: new ObjectId(id) }).then(result => result.value);

const removeAll = filter => driver.db.collection(COLLECTION).deleteMany(filter);

const validate = (task) => {
  const { title, completed = false, id } = task;
  if (typeof title !== 'string') {
    return false;
  }
  if (typeof completed !== 'string' || !(completed === 'true' || completed === 'false')) {
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
  removeAll,
  validate,
};
