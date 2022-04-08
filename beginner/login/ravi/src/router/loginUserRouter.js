const express = require('express');

const router = express.Router();

const loginUserController = require('../controller/loginUser');
// get all login data 
router.get('/',loginUserController.loginUser);

router.get('/:id', loginUserController.loginUserId)

module.exports = router ;