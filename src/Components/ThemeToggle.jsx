import React from 'react';

const ThemeToggle = ({ toggleTheme, theme }) => {
    return (
        <button onClick={toggleTheme} className="theme-toggle">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default ThemeToggle;
