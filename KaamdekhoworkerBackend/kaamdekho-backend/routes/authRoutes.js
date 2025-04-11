const express = require('express');
const router = express.Router();
const { workerLogin, userLogin } = require('../controllers/authController');

router.post('/login', workerLogin);
router.post('/user-login', userLogin);

module.exports = router;
