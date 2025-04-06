import express from 'express';
import { updateWorkerProfile, getWalletBalance, getJobHistory } from '../controllers/workerController.js';

const router = express.Router();

router.put('/:id', updateWorkerProfile);
router.get('/:id/wallet', getWalletBalance);
router.get('/:id/job-history', getJobHistory);

export default router;
