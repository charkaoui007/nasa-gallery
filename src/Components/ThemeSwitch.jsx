import React from 'react';
import './ThemeSwitch.css';

const ThemeSwitch = ({ toggleTheme, theme }) => {
    return (
        <label className="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
            <span className="slider"></span>
        </label>
    );
};

export default ThemeSwitch;
