import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NasaPictures.css';

const API_KEY = 'DEMO_KEY'; // Replace with your NASA API key
const CAMERA_OPTIONS = [
    { name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'NAVCAM', fullName: 'Navigation Camera' },
    { name: 'MAST', fullName: 'Mast Camera' },
    { name: 'CHEMCAM', fullName: 'Chemistry and Camera Complex' },
    { name: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
    { name: 'MARDI', fullName: 'Mars Descent Imager' },
    { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' }
];

const NasaPictures = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(CAMERA_OPTIONS[0].name);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`, {
                params: {
                    sol: 1000,
                    camera: selectedCamera,
                    api_key: API_KEY
                }
            });
            setPhotos(response.data.photos);
        };
        fetchData();
    }, [selectedCamera]);

    return (
        <div className="nasa-pictures">
            <div className="camera-buttons">
                {CAMERA_OPTIONS.map((camera) => (
                    <button
                        key={camera.name}
                        className={camera.name === selectedCamera ? 'active' : ''}
                        onClick={() => setSelectedCamera(camera.name)}
                    >
                        {camera.fullName}
                    </button>
                ))}
            </div>
            <div className="photos-grid">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo-card">
                        <img src={photo.img_src} alt={photo.camera.full_name} />
                        <p>{photo.earth_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NasaPictures;
