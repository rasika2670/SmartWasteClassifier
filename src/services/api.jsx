export const classifyWaste = async (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'waste.jpg',
      type: 'image/jpeg',
    });
  
    const res = await fetch('http://192.168.1.2:5000/classify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return await res.json();
  };
  