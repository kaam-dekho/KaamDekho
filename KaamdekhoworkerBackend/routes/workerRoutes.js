const express = require('express');
const router = express.Router();
const { createWorker, getWorker, loginWorker, registerWorker, updateWorkerProfile, getWorkerById } = require('../controllers/workerController');

router.post('/workers', createWorker);
router.get('/workers/:phone', getWorker);
router.post('/login', loginWorker);
router.post('/profile', registerWorker);
router.put('/profile/:id', updateWorkerProfile);
router.get('/profile/:id', getWorkerById);

module.exports = router;
