import React, { useState } from 'react';
// import axios from 'axios';

const ColorThemeMenu = () => {
  const colorOptions = ['blue', 'green', 'purple']; // List of color options
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = async (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    await saveColorPreference(color);
    updateTheme(color);
  };

  const saveColorPreference = async (color) => {
    // try {
    //   await axios.post('/api/saveColorPreference', { color });
    // } catch (error) {
    //   console.error('Error saving color preference:', error);
    // }
  };

  const updateTheme = (color) => {
    // Update your website's primary color theme based on the selected color
    // This could involve updating CSS variables or theme-related logic
  };

  return (
    <div className="color-theme-menu">
      <h4>Choose Primary Color Theme</h4>
      <select
        className="color-options"
        value={selectedColor}
        onChange={handleColorChange}
      >
        <option value="">Select a color</option>
        {colorOptions.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
    </div>
  );
};

export default ColorThemeMenu;
