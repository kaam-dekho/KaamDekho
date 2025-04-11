const express = require('express');
const router = express.Router();
const { postJob, acceptJob, getJobsByCity } = require('../controllers/jobController');

router.post('/jobs', postJob);
router.post('/jobs/accept', acceptJob);
router.get('/jobs/:city', getJobsByCity);

module.exports = router;
