const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  loginWorker,
  registerWorker,
  getWorkerProfile,
} = require('../controllers/workerController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/auth/login', loginWorker);

// Register new worker details after OTP verification
router.post(
  '/worker/register',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'aadharPhoto', maxCount: 1 },
  ]),
  registerWorker
);

// Fetch worker profile (optional)
router.get('/worker/:phone', getWorkerProfile);

module.exports = router;
