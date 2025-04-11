const supabase = require('../supabase/supabaseClient');

// Worker Login
exports.workerLogin = async (req, res) => {
  const { phone } = req.body;
  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error || !data) {
    return res.json({ isNew: true,
        worker: null,
        phone,
     });
  }
  return res.json({ isNew: false, worker: data });
};

// User Login
exports.userLogin = async (req, res) => {
  const { phone } = req.body;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error || !data) {
    return res.json({ isNew: true });
  }
  return res.json({ isNew: false, user: data });
};
