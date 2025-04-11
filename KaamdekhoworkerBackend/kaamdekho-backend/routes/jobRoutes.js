const express = require('express');
const router = express.Router();
const {
  postJob,
  getAllJobs,
  getJobById,
  acceptJob,
  getWorkerJobs,
  getUserJobs
} = require('../controllers/jobController');

router.post('/post', postJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/accept', acceptJob);
router.get('/worker/:worker_phone', getWorkerJobs);
router.get('/user/:user_id', getUserJobs);

module.exports = router;
