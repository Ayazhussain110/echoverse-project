import React from 'react';
import useTheme from '../../hooks/useTheme';
import ThemeSelector from './ThemeSelector';

const UniversityHeader = () => {
  const { currentTheme } = useTheme();

  return (
    <header className="university-header">
      <div className="header-container">
        <div className="logo-section">
          {currentTheme?.logo ? (
            <img src={currentTheme.logo} alt={currentTheme.name} className="university-logo" />
          ) : (
            <h1 className="app-title">EchoVerse</h1>
          )}
          {currentTheme?.name !== 'Default' && (
            <span className="university-name">{currentTheme.name}</span>
          )}
        </div>
        <div className="header-actions">
          <ThemeSelector />
        </div>
      </div>

      <style>{`
        .university-header {
          background: var(--theme-header-bg);
          border-bottom: 1px solid var(--theme-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: var(--space-3) var(--space-4);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .app-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--theme-primary);
          margin: 0;
        }

        .university-logo {
          max-height: 40px;
          width: auto;
        }

        .university-name {
          font-size: 0.875rem;
          color: var(--theme-text-secondary);
          padding-left: var(--space-2);
          border-left: 1px solid var(--theme-border);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        @media (max-width: 768px) {
          .university-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default UniversityHeader;   