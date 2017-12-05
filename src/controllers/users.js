const { UserModel } = require('../models');
const auth = require('../helpers/auth');
const bcrypt = require('bcrypt');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findByEmail(email)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      bcrypt.compare(password, user.password)
        .then((isCompare) => {
          if (isCompare) {
            res.status(200).json(auth.createToken(user._id));
          } else {
            res.status(401).json({ message: 'Wrong password' });
          }
        }).catch(err => next(err));
    });
};

const signUp = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findByEmail(email)
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'User exist' });
      } else {
        UserModel.save(email, password)
          .then((result) => {
            res.send(auth.createToken(result.insertedId));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};

module.exports = {
  signUp,
  signIn,
};
