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

module.exports = {
  validateUser,
};
