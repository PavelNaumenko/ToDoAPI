const { TaskController } = require('../controllers');
const { Authorization } = require('../middlewares');


const express = require('express');

const router = express.Router();
router.use(Authorization.checkAuth);

router.get('/', TaskController.findAll);
router.post('/', TaskController.create);
router.delete('/', TaskController.remove);
router.put('/', TaskController.update);

module.exports = router;
