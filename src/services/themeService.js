// Theme Service - Manages university-based theming

class ThemeService {
  constructor() {
    this.currentTheme = null;
    this.themes = {
      default: {
        name: 'Default',
        primary: '#4f46e5',
        primaryDark: '#4338ca',
        primaryLight: '#818cf8',
        secondary: '#10b981',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#111827',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        headerBg: '#ffffff',
        footerBg: '#f3f4f6',
        logo: null,
        favicon: null
      },
      harvard: {
        name: 'Harvard University',
        primary: '#a51c30',
        primaryDark: '#7a1524',
        primaryLight: '#c23b4f',
        secondary: '#f4a261',
        background: '#fef9e8',
        surface: '#ffffff',
        text: '#2d2a24',
        textSecondary: '#6b5e4a',
        border: '#e2dcd0',
        headerBg: '#ffffff',
        footerBg: '#f5f0e6',
        logo: '/themes/harvard/logo.png',
        favicon: '/themes/harvard/favicon.ico'
      },
      stanford: {
        name: 'Stanford University',
        primary: '#8c1515',
        primaryDark: '#6b0f0f',
        primaryLight: '#b83a3a',
        secondary: '#2e6b3e',
        background: '#f5f5f0',
        surface: '#ffffff',
        text: '#2c2e2f',
        textSecondary: '#5d6b6e',
        border: '#ded7c8',
        headerBg: '#ffffff',
        footerBg: '#f0ede8',
        logo: '/themes/stanford/logo.png',
        favicon: '/themes/stanford/favicon.ico'
      },
      mit: {
        name: 'MIT',
        primary: '#a31f34',
        primaryDark: '#7a1827',
        primaryLight: '#c24a5e',
        secondary: '#8c8c8c',
        background: '#f0f0f0',
        surface: '#ffffff',
        text: '#1a1a1a',
        textSecondary: '#666666',
        border: '#dddddd',
        headerBg: '#ffffff',
        footerBg: '#e8e8e8',
        logo: '/themes/mit/logo.png',
        favicon: '/themes/mit/favicon.ico'
      },
      oxford: {
        name: 'Oxford University',
        primary: '#002147',
        primaryDark: '#00142e',
        primaryLight: '#1a3c6e',
        secondary: '#9e7b4c',
        background: '#faf7f2',
        surface: '#ffffff',
        text: '#1e2a3a',
        textSecondary: '#6c757d',
        border: '#e5ddd0',
        headerBg: '#ffffff',
        footerBg: '#f5f0e8',
        logo: '/themes/oxford/logo.png',
        favicon: '/themes/oxford/favicon.ico'
      },
      cambridge: {
        name: 'Cambridge University',
        primary: '#1e466e',
        primaryDark: '#143452',
        primaryLight: '#2f5d8f',
        secondary: '#b8860b',
        background: '#fefcf7',
        surface: '#ffffff',
        text: '#2c3e50',
        textSecondary: '#7f8c8d',
        border: '#e5dfd4',
        headerBg: '#ffffff',
        footerBg: '#f8f5ef',
        logo: '/themes/cambridge/logo.png',
        favicon: '/themes/cambridge/favicon.ico'
      },
      ucb: {
        name: 'UC Berkeley',
        primary: '#003b6f',
        primaryDark: '#002a4f',
        primaryLight: '#1a5a92',
        secondary: '#fdb515',
        background: '#fef9f0',
        surface: '#ffffff',
        text: '#2d2f36',
        textSecondary: '#6b6e7c',
        border: '#e2e0e6',
        headerBg: '#ffffff',
        footerBg: '#f5f2e9',
        logo: '/themes/berkeley/logo.png',
        favicon: '/themes/berkeley/favicon.ico'
      }
    };
  }

  /**
   * Get theme by university name
   * @param {string} university - University name
   * @returns {object} Theme object
   */
  getTheme(university) {
    const normalizedUniversity = university?.toLowerCase().replace(/\s+/g, '');
    
    for (const [key, theme] of Object.entries(this.themes)) {
      if (key === normalizedUniversity || 
          theme.name.toLowerCase().includes(normalizedUniversity) ||
          normalizedUniversity?.includes(key)) {
        return theme;
      }
    }
    return this.themes.default;
  }

  /**
   * Apply theme to the document
   * @param {string} university - University name
   */
  applyTheme(university) {
    const theme = this.getTheme(university);
    this.currentTheme = theme;
    
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-primary-dark', theme.primaryDark);
    root.style.setProperty('--theme-primary-light', theme.primaryLight);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-background', theme.background);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-text-secondary', theme.textSecondary);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-header-bg', theme.headerBg);
    root.style.setProperty('--theme-footer-bg', theme.footerBg);
    
    // Add theme class to body
    document.body.classList.add(`theme-${university?.toLowerCase().replace(/\s+/g, '-') || 'default'}`);
    
    // Update favicon if available
    if (theme.favicon) {
      this.updateFavicon(theme.favicon);
    }
    
    // Update logo if available
    if (theme.logo) {
      this.updateLogo(theme.logo);
    }
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    
    return theme;
  }

  /**
   * Update favicon
   * @param {string} faviconUrl - URL of the favicon
   */
  updateFavicon(faviconUrl) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  }

  /**
   * Update logo
   * @param {string} logoUrl - URL of the logo
   */
  updateLogo(logoUrl) {
    const logoElements = document.querySelectorAll('.university-logo');
    logoElements.forEach(element => {
      if (element.tagName === 'IMG') {
        element.src = logoUrl;
      } else {
        element.style.backgroundImage = `url(${logoUrl})`;
      }
    });
  }

  /**
   * Reset to default theme
   */
  resetTheme() {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', '#4f46e5');
    root.style.setProperty('--theme-primary-dark', '#4338ca');
    root.style.setProperty('--theme-primary-light', '#818cf8');
    root.style.setProperty('--theme-secondary', '#10b981');
    root.style.setProperty('--theme-background', '#f9fafb');
    root.style.setProperty('--theme-surface', '#ffffff');
    root.style.setProperty('--theme-text', '#111827');
    root.style.setProperty('--theme-text-secondary', '#6b7280');
    root.style.setProperty('--theme-border', '#e5e7eb');
    root.style.setProperty('--theme-header-bg', '#ffffff');
    root.style.setProperty('--theme-footer-bg', '#f3f4f6');
    
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    this.currentTheme = this.themes.default;
    
    return this.themes.default;
  }

  /**
   * Get available universities
   * @returns {Array} List of available universities
   */
  getAvailableUniversities() {
    return Object.entries(this.themes).map(([key, theme]) => ({
      id: key,
      name: theme.name,
      primaryColor: theme.primary
    }));
  }

  /**
   * Generate custom CSS for theme
   * @param {string} university - University name
   * @returns {string} CSS string
   */
  generateThemeCSS(university) {
    const theme = this.getTheme(university);
    return `
      :root {
        --theme-primary: ${theme.primary};
        --theme-primary-dark: ${theme.primaryDark};
        --theme-primary-light: ${theme.primaryLight};
        --theme-secondary: ${theme.secondary};
        --theme-background: ${theme.background};
        --theme-surface: ${theme.surface};
        --theme-text: ${theme.text};
        --theme-text-secondary: ${theme.textSecondary};
        --theme-border: ${theme.border};
        --theme-header-bg: ${theme.headerBg};
        --theme-footer-bg: ${theme.footerBg};
      }
      
      body {
        background-color: var(--theme-background);
        color: var(--theme-text);
      }
      
      .btn-primary {
        background-color: var(--theme-primary);
      }
      
      .btn-primary:hover {
        background-color: var(--theme-primary-dark);
      }
      
      .text-primary {
        color: var(--theme-primary);
      }
      
      .border-primary {
        border-color: var(--theme-primary);
      }
      
      .bg-primary-light {
        background-color: var(--theme-primary-light);
      }
    `;
  }
}

export default new ThemeService();