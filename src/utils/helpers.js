export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUniversityEmail = (email) => {
  return email.endsWith('.edu') || email.includes('university');
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const calculatePoints = (activities) => {
  return activities.reduce((total, activity) => total + activity.points, 0);
};

export const getUniversityTheme = (university) => {
  const themes = {
    default: {
      primary: '#4f46e5',
      secondary: '#818cf8',
      background: '#f3f4f6',
    },
  };
  return themes[university] || themes.default;
};
