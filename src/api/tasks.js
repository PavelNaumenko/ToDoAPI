const { TaskController } = require('../controllers');
const { Authorization } = require('../middlewares');


const express = require('express');

const router = express.Router();
router.use(Authorization.checkAuth);

router.get('/tasks', TaskController.findAll);
router.post('/tasks', TaskController.create);
router.get('/task/:id', TaskController.findById);
router.post('/task', TaskController.create);
router.delete('/tasks', TaskController.removeAll);
router.delete('/task/:id', TaskController.remove);
router.put('/task/:id', TaskController.update);

module.exports = router;
