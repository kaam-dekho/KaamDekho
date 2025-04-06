import express from 'express';
import { workerLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', workerLogin);

export default router;
