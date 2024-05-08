const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes.js');
const messageRouter = require('./messageRoutes.js');

router.route('/user', userRouter);
router.route('/message', messageRouter);

module.exports = router;
