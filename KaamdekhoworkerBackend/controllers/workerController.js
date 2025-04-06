import { updateWorker, getWorkerWallet, getWorkerJobHistory } from '../models/workerModel.js';

export const updateWorkerProfile = async (req, res) => {
  try {
    const updated = await updateWorker(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating worker profile' });
  }
};

export const getWalletBalance = async (req, res) => {
  try {
    const balance = await getWorkerWallet(req.params.id);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching wallet balance' });
  }
};

export const getJobHistory = async (req, res) => {
  try {
    const jobs = await getWorkerJobHistory(req.params.id);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job history' });
  }
};
