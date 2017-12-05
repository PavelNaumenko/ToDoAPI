const apiRouter = require('express').Router();

apiRouter.use('/v0/users', require('./users'));
apiRouter.use('/v0', require('./tasks'));

module.exports = apiRouter;
