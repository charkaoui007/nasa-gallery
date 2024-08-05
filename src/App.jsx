import React from 'react';
import './App.css';
import NasaPictures from './Components/NasaPictures';

function App() {
  return (
    <div className="app-container">
      <h1 className="title">NASA Mars Rover Photos</h1>
      <NasaPictures />
    </div>
  );
}

export default App;
