// src/Components/CameraButtons.jsx
import React from 'react';

const CameraButtons = ({ cameras, setCamera }) => {
    return (
        <div className="camera-buttons">
            {cameras.map((camera) => (
                <button key={camera.name} onClick={() => setCamera(camera.name)}>
                    {camera.name}
                </button>
            ))}
        </div>
    );
};

export default CameraButtons;
