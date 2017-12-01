const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

function createToken(id) {
  return jwt.sign({ id }, secret);
}

function getIdFromToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  createToken,
  getIdFromToken,

};
