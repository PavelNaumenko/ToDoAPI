const driver = require('../drivers/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'tasks';

const create = task => driver.db.collection(COLLECTION).insertOne({
  ...task,
  _id: new ObjectId(task._id),
  created_at: new Date(),
})
  .then(result => result.ops[0]);

const findAllByUserId = ({ filter, limit, offset, sort }) => driver.db.collection(COLLECTION)
  .find(
    filter,
    {
      _id: 1,
      title: 1,
      completed: 1,
      created_at: 1,
    },
  )
  .skip(offset)
  .limit(limit)
  .sort({ created_at: sort })
  .toArray();

const findById = ({ _id, userId }) => driver.db.collection(COLLECTION)
  .findOne({ _id: new ObjectId(_id), userId }, { _id: 1, title: 1, completed: 1, created_at: 1 });

const update = task => driver.db.collection(COLLECTION).updateOne({ _id: new ObjectId(task._id) }, {
  $set: {
    ...task,
    _id: new ObjectId(task._id),
  },
});

const remove = id => driver.db.collection(COLLECTION)
  .findOneAndDelete({ _id: new ObjectId(id) }).then(result => result.value);

const removeAll = filter => driver.db.collection(COLLECTION).deleteMany(filter);

module.exports = {
  create,
  findAllByUserId,
  findById,
  update,
  remove,
  removeAll,
};
