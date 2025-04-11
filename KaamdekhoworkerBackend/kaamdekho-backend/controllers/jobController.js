const supabase = require('../supabase/supabaseClient');

exports.postJob = async (req, res) => {
  const { user_id, job_title, job_description, job_type, city } = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      user_id,
      job_title,
      job_description,
      job_type,
      city,
      status: 'pending',
      posted_at: new Date()
    }]);

  if (error) return res.status(400).json({ error });
  res.json({ message: 'Job posted', data });
};

exports.getAllJobs = async (req, res) => {
  const city = req.query.city;
  const query = supabase.from('jobs').select('*').eq('status', 'pending');
  if (city) query.eq('city', city);

  const { data, error } = await query;

  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.getJobById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error });
  res.json(data);
};

exports.acceptJob = async (req, res) => {
  const { job_id, worker_phone } = req.body;

  const { data, error } = await supabase
    .from('jobs')
    .update({
      accepted_by: worker_phone,
      status: 'accepted'
    })
    .eq('id', job_id);

  if (error) return res.status(400).json({ error });
  res.json({ message: 'Job accepted', data });
};

exports.getWorkerJobs = async (req, res) => {
  const { worker_phone } = req.params;

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('accepted_by', worker_phone);

  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.getUserJobs = async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user_id);

  if (error) return res.status(500).json({ error });
  res.json(data);
};
