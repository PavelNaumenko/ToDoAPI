const { UserModel } = require('../models').UserModel;

function signIn(req, res) {
  const { email, password } = req.body;
  UserModel.findUser(email, password)
    .then((result) => {
      if (result) { res.status(200).json(result); } else { res.status(400).json({ error: 'User not exist' }); }
    });
}

function signUp(req, res) {
  const { email, password } = req.body;
  UserModel.findUser(email, password)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        UserModel.saveUser(email, password)
          .then((result) => {
            res.send(result.insertedId);
          });
      }
    });
}

module.exports = {
  signUp,
  signIn,
};
