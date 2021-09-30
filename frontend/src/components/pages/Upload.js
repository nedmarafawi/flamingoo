import React, { useState } from 'react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.log('Error');
    };
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'travel_app');

    setLoading(true);

    // First fetch
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/nedmarafawi/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();

    // Call endpoint to post this file and save it to MongoDB
    // db.collections("files").insertOne(file) on MongoDB

    // Second fetch
    const response = await fetch('/upload', {
      method: 'POST',
      body: JSON.stringify({ data: file }),
      headers: { 'Content-Type': 'application/json' },
    });
    const uploadFile = await response.json();
    console.log(JSON.stringify(file));
    // console.log(file);
    setImage(file.secure_url);
    // setImage(uploadFile.secure_url);
    setLoading(false);
  };

  return (
    <div>
      <h1>Upload</h1>
      <form className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={uploadImage}
          className="form-input"
        />
        <button className="btn" type="submit" onSubmit={handleSubmit}>
          Upload
        </button>
      </form>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ height: '300px', outline: 'none' }} />
      )}
    </div>
  );
};

export default Upload;
