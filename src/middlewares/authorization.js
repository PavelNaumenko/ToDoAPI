const auth = require('../helpers/auth');

const checkAuth = (req, res, next) => {
  const authStr = req.get('authorization');
  if (authStr) {
    auth.getIdFromToken(authStr)
      .then((result) => {
        req.app.locals.userId = result.id;
        next();
      })
      .catch(err => next(err));
  }
  res.status(401).json({ message: 'Unauthorized' });
};

module.exports = {
  checkAuth,
};
