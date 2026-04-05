import { useState, useEffect } from 'react';
import themeService from '../services/themeService';

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(themeService.currentTheme || themeService.themes.default);
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get available universities
    setAvailableUniversities(themeService.getAvailableUniversities());
    setLoading(false);

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  const applyTheme = (university) => {
    const theme = themeService.applyTheme(university);
    setCurrentTheme(theme);
    return theme;
  };

  const resetTheme = () => {
    const defaultTheme = themeService.resetTheme();
    setCurrentTheme(defaultTheme);
    return defaultTheme;
  };

  const getUniversityTheme = (university) => {
    return themeService.getTheme(university);
  };

  return {
    currentTheme,
    availableUniversities,
    loading,
    applyTheme,
    resetTheme,
    getUniversityTheme
  };
};

export default useTheme;