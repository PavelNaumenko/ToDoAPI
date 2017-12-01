const { UserModel } = require('../models');
const auth = require('../helpers/auth');
const bcrypt = require('bcrypt');

function signIn(req, res) {
  const { email, password } = req.body;
  UserModel.findUser(email)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      console.log(user);
      bcrypt.compare(password, user.password)
        .then((isCompare) => {
          if (isCompare) {
            res.status(200).json(auth.createToken(user._id));
          } else { res.status(401).json({ message: 'Wrong password' }); }
        }).catch(err => console.log(err));
    });
}

function signUp(req, res) {
  const { email, password } = req.body;
  UserModel.findUser(email)
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'User exist' });
      } else {
        UserModel.saveUser(email, password)
          .then((result) => {
            res.send(auth.createToken(result.insertedId));
          });
      }
    });
}

module.exports = {
  signUp,
  signIn,
};
