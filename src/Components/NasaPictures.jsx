import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NasaPictures.css';
import PhotoModal from './PhotoModal'; // Import PhotoModal component

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

const PHOTOS_PER_PAGE = 12;

const NasaPictures = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(CAMERA_OPTIONS[0].name);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // For PhotoModal

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
            setCurrentPage(1); // Reset to the first page when camera changes
        };
        fetchData();
    }, [selectedCamera]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const currentPhotos = photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

    const openPhotoModal = (photo) => {
        setSelectedPhoto(photo);
    };

    const closePhotoModal = () => {
        setSelectedPhoto(null);
    };

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
                {currentPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="photo-card"
                        onClick={() => openPhotoModal(photo)}
                    >
                        <img src={photo.img_src} alt={photo.camera.full_name} />
                        <p>{photo.earth_date}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            {selectedPhoto && (
                <PhotoModal
                    photo={selectedPhoto}
                    onClose={closePhotoModal}
                />
            )}
        </div>
    );
};

export default NasaPictures;
