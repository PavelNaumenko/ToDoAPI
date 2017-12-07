const auth = require('../helpers/auth');

const checkAuth = (req, res, next) => {
  const authStr = req.get('authorization');
  if (authStr) {
    const token = auth.getIdFromToken(authStr);
    if (token) {
      req.app.locals.userId = token.id;
      next();
    } else {
      next('err');
    }
  } else { res.status(401).json({ message: 'Unauthorized' }); }
};

module.exports = {
  checkAuth,
};
