const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/User/userController');
const { authenticationUser } = require('../app/middlewares/authentication');

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);
router.get('/api/profile/:id', authenticationUser, userController.profile )

module.exports = router;