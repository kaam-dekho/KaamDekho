const supabase = require('../supabase/supabaseClient');
const { uploadFileToStorage } = require('../utils/uploadToStorage');

const loginWorker = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  try {
    const { data: worker, error } = await supabase
      .from('workers')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Supabase error' });
    }

    if (!worker) {
      // Create new worker with just phone
      const { data: newWorker, error: insertErr } = await supabase
        .from('workers')
        .insert([{ phone }])
        .select()
        .single();

      if (insertErr) {
        console.error('Insert error:', insertErr);
        return res.status(500).json({ error: 'Could not create worker' });
      }

      return res.status(200).json({ worker: newWorker, isNew: true });
    }

    return res.status(200).json({ worker, isNew: false });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const registerWorker = async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      skills,
      experience,
      phone,
    } = req.body;

    if (!name || !dob || !gender || !skills || !experience || !phone || !req.files) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const profilePhotoFile = req.files['profilePhoto'][0];
    const aadharPhotoFile = req.files['aadharPhoto'][0];

    // Upload photos to Supabase Storage
    const profilePhotoUrl = await uploadFileToStorage(profilePhotoFile, `profile-${Date.now()}-${phone}`);
    const aadharPhotoUrl = await uploadFileToStorage(aadharPhotoFile, `aadhaar-${Date.now()}-${phone}`);

    const { error: updateError } = await supabase
      .from('workers')
      .update({
        name,
        worker_dob: dob,
        gender,
        worker_type: skills,
        experience: parseInt(experience),
        profile_photo: profilePhotoUrl,
        aadhaar_photo: aadharPhotoUrl,
      })
      .eq('phone', phone);

    if (updateError) {
      console.error('Update Error:', updateError);
      return res.status(500).json({ error: 'Failed to update worker profile' });
    }

    return res.status(200).json({ message: 'Worker profile updated successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getWorkerProfile = async (req, res) => {
  const { phone } = req.params;
  if (!phone) return res.status(400).json({ error: 'Phone is required' });

  try {
    const { data: worker, error } = await supabase
      .from('workers')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error) {
      console.error('Fetch worker error:', error);
      return res.status(404).json({ error: 'Worker not found' });
    }

    return res.status(200).json({ worker });
  } catch (err) {
    console.error('Get worker profile error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  loginWorker,
  registerWorker,
  getWorkerProfile,
};
