const validateUser = (email, password) => {
  if (!password) {
    throw new Error('Password must be exist');
  }
  if (!email) {
    throw new Error('Email must be exist');
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
    throw new Error('Invalid email');
  }
  return true;
};

const validateTask = (task) => {
  const { _id, title, completed = false } = task;
  if (!title) {
    throw new Error('Property title does not exist');
  }
  if (typeof title !== 'string') {
    throw new Error(`title expected string but got ${typeof title}`);
  }
  if (typeof completed !== 'boolean') {
    throw new Error(`completed expected string but got ${typeof completed}`);
  }
  if (_id && !/^[0-9a-fA-F]{24}$/.test(_id)) {
    throw new Error('_id must be a string of 24 hex characters');
  }
  return true;
};

module.exports = {
  validateUser,
  validateTask,
};
