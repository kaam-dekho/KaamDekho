const supabase = require('../supabase/supabaseClient');

exports.login = async (req, res) => {
  const { phone, type } = req.body; // type = 'user' or 'worker'

  const table = type === 'user' ? 'users' : 'workers';
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('phone', phone)
    .single();

  if (error && error.code === 'PGRST116') {
    return res.status(200).json({ exists: false });
  } else if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ exists: true, profile: data });
};
