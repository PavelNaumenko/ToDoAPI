const { UserModel } = require('../models');
const auth = require('../helpers/auth');
const validator = require('../helpers/validators');
const bcrypt = require('bcrypt');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  try {
    validator.validateUser(email, password);
    UserModel.findByEmail(email)
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: 'User not found' });
        }
        bcrypt.compare(password, user.password)
          .then((isCompare) => {
            if (isCompare) {
              res.status(200).json(auth.createToken(user._id));
            } else {
              res.status(401).json({ message: 'Wrong email or password' });
            }
          }).catch(err => next(err));
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signUp = (req, res, next) => {
  const { email, password } = req.body;
  try {
    validator.validateUser(email, password);
    UserModel.findByEmail(email)
      .then((user) => {
        if (user) {
          res.status(409).json({ message: 'User exist' });
        } else {
          UserModel.save(email, password)
            .then((result) => {
              res.status(200).json(auth.createToken(result.insertedId));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
