import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function Profile() {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      console.log('taco');
      const res = await fetch('/profile');
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1 className="title">Profile</h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={imageId}
              width="300"
              height="200"
              crop="scale"
            />
          ))}
      </div>
    </div>
  );
}
