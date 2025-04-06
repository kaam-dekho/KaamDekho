import pool from '../config/db.js';

export const findWorkerByPhone = async (phone) => {
  const res = await pool.query('SELECT * FROM workers WHERE phone = $1', [phone]);
  return res.rows[0];
};

export const createWorker = async (phone) => {
  const res = await pool.query('INSERT INTO workers (phone) VALUES ($1) RETURNING *', [phone]);
  return res.rows[0];
};

export const updateWorker = async (id, data) => {
  const {
    name, gender, aadhaar_number, aadhaar_photo, profile_photo, worker_type, city
  } = data;

  const res = await pool.query(
    `UPDATE workers SET name=$1, gender=$2, aadhaar_number=$3, aadhaar_photo=$4, 
     profile_photo=$5, worker_type=$6, city=$7 WHERE id=$8 RETURNING *`,
    [name, gender, aadhaar_number, aadhaar_photo, profile_photo, worker_type, city, id]
  );
  return res.rows[0];
};

export const getWorkerWallet = async (id) => {
  const res = await pool.query('SELECT balance FROM workers WHERE id=$1', [id]);
  return res.rows[0]?.balance || 0;
};

export const getWorkerJobHistory = async (worker_id) => {
  const res = await pool.query('SELECT * FROM jobs WHERE worker_id=$1 AND status=$2', [worker_id, 'accepted']);
  return res.rows;
};
