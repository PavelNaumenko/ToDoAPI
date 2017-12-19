const { UserModel } = require('../models');
const User = require('../entities/user');
const auth = require('../helpers/auth');


const signIn = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const findedUser = await UserModel.findByEmail(user.email);
    await user.comparePassword(findedUser.password);
    res.status(200).json(auth.createToken(findedUser._id));
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await UserModel.isDuplicateUser(user);
    const result = UserModel.save(user);
    res.status(200).json(auth.createToken(result.insertedId));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
