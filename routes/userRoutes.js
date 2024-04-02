const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authValidator = require('../middlewares/validators/authValidator');

router.post('/register', authValidator.validateRegister, userController.register);
router.post('/login', authValidator.validateLogin, userController.login);

module.exports = router;