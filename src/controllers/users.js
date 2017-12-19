const { UserModel } = require('../models');
const User = require('../entities/user');
const ToDoError = require('../helpers/ToDoError');
const auth = require('../helpers/auth');
const bcrypt = require('bcrypt');


const signIn = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const findedUser = await UserModel.findByEmail(user.email);
    const isComparePassword = await bcrypt.compare(findedUser.password, user.password);
    if (!isComparePassword) {
      next(new ToDoError('Wrong email or password', 401));
    }
    res.status(200).json(auth.createToken(findedUser._id));
  } catch (err) {
    throw new Error();
  }
};

// const signIn = (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     validator.validateUser(email, password);
//     UserModel.findByEmail(email)
//       .then((user) => {
//         if (!user) {
//           res.status(401).json({ message: 'User not found' });
//         }
//         bcrypt.compare(password, user.password)
//           .then((isCompare) => {
//             if (isCompare) {
//               res.status(200).json(auth.createToken(user._id));
//             } else {
//               res.status(401).json({ message: 'Wrong email or password' });
//             }
//           }).catch(err => next(err));
//       });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const signUp = (req, res, next) => {
  const { email, password } = req.body;
  try {
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
