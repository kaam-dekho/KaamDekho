const supabase = require('../supabase/supabaseClient');

exports.createWorker = async (req, res) => {
  const { name, phone, profile_photo_url, gender, aadhaar_number, aadhaar_photo_url, city, worker_dob, worker_type } = req.body;

  const { data, error } = await supabase
    .from('workers')
    .insert([{ name, phone, profile_photo_url, gender, aadhaar_number, aadhaar_photo_url, city, worker_dob, worker_type }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.getWorker = async (req, res) => {
  const { phone } = req.params;

  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error) return res.status(404).json({ error: error.message });

  res.status(200).json(data);
};



exports.loginWorker = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Check if worker exists
    const { data: existingWorker, error: fetchError } = await supabase
      .from('workers')
      .select('*')
      .eq('phone', phone)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return res.status(500).json({ error: fetchError.message });
    }

    // If worker exists, return their data
    if (existingWorker) {
      return res.status(200).json({ message: 'Worker logged in', worker: existingWorker });
    }

    // If not exists, insert a new minimal record
    const { data: newWorker, error: insertError } = await supabase
      .from('workers')
      .insert([{ phone }])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({ message: 'Worker registered', worker: newWorker });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};




exports.registerWorker = async (req, res) => {
  try {
    const {
      phone,
      name,
      profile_photo,
      gender,
      aadhaar_number,
      aadhaar_photo,
      worker_type,
      city,
      balance,
      worker_dob,
    } = req.body;

    const { data, error } = await supabase
      .from('workers')
      .insert([{
        phone,
        name,
        profile_photo,
        gender,
        aadhaar_number,
        aadhaar_photo,
        worker_type,
        city,
        balance,
        worker_dob,
      }])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to register worker' });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateWorkerProfile = async (req, res) => {
  const workerId = req.params.id;
  const updateData = req.body;

  try {
    const { data, error } = await supabase
      .from('workers')
      .update(updateData)
      .eq('id', workerId)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: 'Profile updated', worker: data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getWorkerById = async (req, res) => {
  const workerId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('id', workerId)
      .single();

    if (error) return res.status(404).json({ error: error.message });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
