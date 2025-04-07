import { createJob, getJobsByFilter, acceptJobByWorker } from '../models/jobModel.js';

export const postJob = async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.json(job);
  } catch (err) {
    console.error('Post job error:', err.message);
    res.status(500).json({ error: 'Error posting job' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { city, worker_type } = req.query;
    const jobs = await getJobsByFilter(city, worker_type);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching jobs' });
  }
};

export const acceptJob = async (req, res) => {
  try {
    const { worker_id } = req.body;
    const jobId = req.params.id;
    const updated = await acceptJobByWorker(jobId, worker_id);
    res.json(updated);
  } catch (err) {
    console.error('Accept job error:', err.message);
    res.status(500).json({ error: 'Error accepting job' });
  }
};
