const supabase = require('../supabase/supabaseClient');

exports.createUser = async (req, res) => {
  const { name, phone, profile_photo_url, gender, aadhaar_number, aadhaar_photo_url, city, user_dob } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, phone, profile_photo_url, gender, aadhaar_number, aadhaar_photo_url, city, user_dob }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.getUser = async (req, res) => {
  const { phone } = req.params;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error) return res.status(404).json({ error: error.message });

  res.status(200).json(data);
};

exports.loginUser = (req, res) => {
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
  
    // Simulate login or registration logic for now
    res.json({ message: `User with phone ${phone} logged in or registered` });
  };
  
  exports.registerUser = async (req, res) => {
    try {
      const {
        phone,
        name,
        profile_photo_url,
        gender,
        aadhaar_number,
        aadhaar_photo_url,
        city,
        user_type,
        user_dob,
      } = req.body;
  
      const { data, error } = await supabase
        .from('users')
        .insert([{
          phone,
          name,
          profile_photo_url,
          gender,
          aadhaar_number,
          aadhaar_photo_url,
          city,
          user_type,
          user_dob,
        }])
        .select();
  
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to register user' });
      }
  
      res.status(201).json(data[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };