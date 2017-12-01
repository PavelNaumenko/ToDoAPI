const { UserController } = require('../controllers');
const express = require('express');

const router = express.Router();


router.post('/sign_in', UserController.signIn);
router.post('/sign_up', UserController.signUp);

module.exports = router;
