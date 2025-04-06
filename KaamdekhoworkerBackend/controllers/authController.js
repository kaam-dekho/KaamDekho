import { findWorkerByPhone, createWorker } from '../models/workerModel.js';

export const workerLogin = async (req, res) => {
  const { phone } = req.body;
  try {
    let worker = await findWorkerByPhone(phone);
    if (worker) {
      return res.json({ newUser: false, worker });
    } else {
      const newWorker = await createWorker(phone);
      return res.json({ newUser: true, worker: newWorker });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
