const createWorker = async ({ phone }) => {
    const { data, error } = await supabase
      .from('workers')
      .insert([{ phone }])
      .select()
      .single();
    if (error) throw error;
    return data;
  };
  