const supabase = require('../supabase/supabaseClient');

exports.postJob = async (req, res) => {
  const { user_phone, title, description,address, media_url, budget, worker_type, city } = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .insert([{ user_phone, title, description, address, media_url, budget, worker_type, city }])
    .select();


  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.acceptJob = async (req, res) => {
  const { job_id, worker_phone } = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .update({ accepted_by: worker_phone })
    .eq('id', job_id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Job accepted', data });
};

exports.getJobsByCity = async (req, res) => {
  const { city } = req.params;

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('city', city)
    .is('accepted_by', null);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};
