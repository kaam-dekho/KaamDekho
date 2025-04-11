const supabase = require('../supabase/supabaseClient');

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error });
  res.json(data);
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id);

  if (error) return res.status(400).json({ error });
  res.json({ message: 'User profile updated', data });
};
