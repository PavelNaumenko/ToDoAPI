const auth = require('../helpers/auth');

const checkAuth = (req, res, next) => {
  const authStr = req.get('authorization');
  if (authStr) {
    try {
      const token = auth.getIdFromToken(authStr);
      if (token) {
        req.userId = token.id;
        next();
      } else {
        next('err');
      }
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized, token expired' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  checkAuth,
};
