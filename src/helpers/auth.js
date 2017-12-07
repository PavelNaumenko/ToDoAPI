const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

const createToken = (id) => {
  const token = jwt.sign({ id }, SECRET);
  return `Bearer ${token}`;
};

const getIdFromToken = authStr => jwt.verify(authStr.split(' ')[1], SECRET);

module.exports = {
  createToken,
  getIdFromToken,
};
