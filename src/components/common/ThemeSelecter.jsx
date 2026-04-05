import React, { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, availableUniversities, applyTheme, resetTheme } = useTheme();

  const handleThemeChange = (universityId) => {
    if (universityId === 'default') {
      resetTheme();
    } else {
      applyTheme(universityId);
    }
    setIsOpen(false);
  };

  return (
    <div className="theme-selector">
      <button 
        className="theme-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="theme-color-preview" style={{ backgroundColor: currentTheme?.primary }}></div>
        <span>{currentTheme?.name || 'Default Theme'}</span>
        <FiChevronDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-option" onClick={() => handleThemeChange('default')}>
            <div className="theme-color-preview" style={{ backgroundColor: '#4f46e5' }}></div>
            <span>Default Theme</span>
            {currentTheme?.name === 'Default' && <FiCheck className="check-icon" />}
          </div>
          {availableUniversities.map((university) => (
            <div 
              key={university.id} 
              className="theme-option"
              onClick={() => handleThemeChange(university.id)}
            >
              <div className="theme-color-preview" style={{ backgroundColor: university.primaryColor }}></div>
              <span>{university.name}</span>
              {currentTheme?.name === university.name && <FiCheck className="check-icon" />}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .theme-selector {
          position: relative;
        }

        .theme-selector-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--theme-surface);
          border: 1px solid var(--theme-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--theme-text);
          transition: all var(--transition-fast);
        }

        .theme-selector-btn:hover {
          background: var(--theme-primary-light);
        }

        .theme-color-preview {
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          border: 1px solid var(--theme-border);
        }

        .dropdown-icon {
          transition: transform var(--transition-fast);
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .theme-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: var(--space-2);
          background: var(--theme-surface);
          border: 1px solid var(--theme-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          min-width: 200px;
          z-index: 100;
          overflow: hidden;
        }

        .theme-option {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-option:hover {
          background-color: var(--theme-primary-light);
        }

        .check-icon {
          margin-left: auto;
          color: var(--theme-primary);
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;