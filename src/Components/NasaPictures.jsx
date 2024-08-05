import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NasaPictures.css';

const NasaPictures = () => {
  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState('FHAZ');

  const cameras = [
    { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
    { name: 'NAVCAM', full_name: 'Navigation Camera' },
    { name: 'MAST', full_name: 'Mast Camera' },
    { name: 'CHEMCAM', full_name: 'Chemistry and Camera Complex' },
    { name: 'MAHLI', full_name: 'Mars Hand Lens Imager' },
    { name: 'MARDI', full_name: 'Mars Descent Imager' },
    { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&api_key=DEMO_KEY`);
        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [camera]);

  return (
    <div className="nasa-pictures">
      <div className="camera-buttons">
        {cameras.map((cam) => (
          <button 
            key={cam.name} 
            className={camera === cam.name ? 'active' : ''} 
            onClick={() => setCamera(cam.name)}
          >
            {cam.full_name}
          </button>
        ))}
      </div>
      <div className="photos">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.img_src} alt={`Mars Rover - ${photo.camera.full_name}`} />
            <p>{photo.earth_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NasaPictures;
