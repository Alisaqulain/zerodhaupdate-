import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
    </button>
  );
};

export default ThemeToggle;


