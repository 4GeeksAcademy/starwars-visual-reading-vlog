import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, onSearchChange]);

  const handleClear = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  return (
    <div className="search-container">
      <div className={`retro-search-wrapper ${isFocused ? 'focused' : ''}`}>
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        
        <input
          type="text"
          className="retro-search-input"
          placeholder="Search the galaxy..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {localSearchTerm && (
          <button
            className="clear-button"
            onClick={handleClear}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        
        {/* Scanning line */}
        <div className="scan-line"></div>
      </div>
      
      {localSearchTerm && (
        <div className="search-status">
          <i className="fas fa-satellite-dish me-2"></i>
          Scanning for: <strong>"{localSearchTerm}"</strong>
        </div>
      )}
      
      <style jsx>{`
        .search-container {
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .retro-search-wrapper {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.9),
            rgba(15, 52, 96, 0.8)
          );
          border: 2px solid var(--sw-blue);
          border-radius: 50px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          overflow: hidden;
        }

        .retro-search-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 212, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
        }

        .retro-search-wrapper.focused {
          border-color: var(--sw-yellow);
          box-shadow: var(--neon-glow-yellow);
          transform: scale(1.02);
        }

        .retro-search-wrapper.focused::before {
          left: 100%;
        }

        .search-icon {
          color: var(--sw-cyan);
          font-size: 1.2rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .retro-search-wrapper.focused .search-icon {
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          transform: scale(1.1);
        }

        .retro-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--sw-cyan);
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .retro-search-input::placeholder {
          color: rgba(0, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .retro-search-wrapper.focused .retro-search-input {
          color: var(--sw-yellow);
          text-shadow: 0 0 5px var(--sw-yellow);
        }

        .retro-search-wrapper.focused .retro-search-input::placeholder {
          color: rgba(255, 232, 31, 0.6);
        }

        .clear-button {
          background: transparent;
          border: 2px solid var(--sw-pink);
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sw-pink);
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .clear-button:hover {
          background: var(--sw-pink);
          color: var(--dark-space);
          transform: scale(1.1);
          box-shadow: var(--neon-glow-pink);
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--sw-blue),
            var(--sw-yellow),
            var(--sw-pink),
            transparent
          );
          animation: scanSearch 3s linear infinite;
          opacity: 0.7;
        }

        .retro-search-wrapper.focused .scan-line {
          animation-duration: 1s;
          opacity: 1;
        }

        .search-status {
          margin-top: 1rem;
          text-align: center;
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          animation: pulse 2s ease-in-out infinite;
        }

        .search-status strong {
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
        }

        @keyframes scanSearch {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Data grid background */
        .retro-search-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px);
          background-size: 10px 10px;
          pointer-events: none;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .retro-search-wrapper {
            padding: 12px 16px;
            border-radius: 40px;
          }
          
          .retro-search-input {
            font-size: 1rem;
          }
          
          .search-icon {
            font-size: 1rem;
          }
          
          .clear-button {
            width: 30px;
            height: 30px;
          }
          
          .search-status {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;