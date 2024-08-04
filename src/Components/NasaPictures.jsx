// src/components/NasaPictures.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NasaPictures() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
                    params: {
                        sol: 1000,
                        
                        api_key: 'DEMO_KEY'
                    }
                });
                setPhotos(response.data.photos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1 className="text-center my-6 mt-10 sm:my-14 text-3xl md:text-5xl">NASA Mars Photos</h1>
            <div className="grid gap-4 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {photos.map((photo) => (
                    <div key={photo.id} className="rounded-3xl">
                        <img src={photo.img_src} alt={photo.camera.full_name} className="rounded-3xl" />
                        <p>{photo.camera.full_name}</p>
                        <p>{photo.earth_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NasaPictures;
