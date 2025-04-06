import pool from '../config/db.js';

export const createJob = async (data) => {
  const {
    user_id, description, media, budget,
    worker_type, city, posting_date, posting_time
  } = data;

  const res = await pool.query(
    `INSERT INTO jobs (user_id, description, media, budget, worker_type, city, posting_date, posting_time)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [user_id, description, media, budget, worker_type, city, posting_date, posting_time]
  );
  return res.rows[0];
};

export const getJobsByFilter = async (city, worker_type) => {
  const res = await pool.query(
    'SELECT * FROM jobs WHERE city=$1 AND worker_type=$2 AND status=$3',
    [city, worker_type, 'pending']
  );
  return res.rows;
};

export const acceptJobByWorker = async (jobId, worker_id) => {
  const res = await pool.query(
    'UPDATE jobs SET status=$1, worker_id=$2 WHERE id=$3 RETURNING *',
    ['accepted', worker_id, jobId]
  );
  return res.rows[0];
};
