const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/chat', authMiddleware, pageController.getChatPage);
router.get('/login', pageController.getLoginPage);
router.get('/register', pageController.getRegisterPage);

module.exports = router;
