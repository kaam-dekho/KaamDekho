import express from 'express';
import { postJob, getJobs, acceptJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', postJob);
router.get('/', getJobs);
router.post('/:id/accept', acceptJob);

export default router;
