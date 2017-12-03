const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

const createToken = id => jwt.sign({ id }, SECRET)
  .then(token => `Bearer ${token}`);

const getIdFromToken = token => jwt.verify(token.split(' ')[1], SECRET);

module.exports = {
  createToken,
  getIdFromToken,
};
