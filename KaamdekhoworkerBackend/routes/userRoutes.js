const express = require('express');
const router = express.Router();
const { createUser, getUser, loginUser, registerUser } = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users/:phone', getUser);
router.post('/login', loginUser); 
router.post('/profile', registerUser);

module.exports = router;
