import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';

export const Navbar = () => {
  const { state } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalFavorites = state.favorites?.characters?.length + 
                        state.favorites?.planets?.length + 
                        state.favorites?.vehicles?.length || 0;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="retro-nav fixed-top">
      <div className="container-fluid px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* Brand */}
          <Link to="/" className="retro-nav-brand text-decoration-none">
            <i className="fas fa-rocket me-2"></i>
            GALAXY ARCHIVE
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link 
              to="/" 
              className={`retro-nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <i className="fas fa-home me-2"></i>
              HOME SECTOR
            </Link>
            
            <Link 
              to="/favorites" 
              className={`retro-nav-link position-relative ${isActive('/favorites') ? 'active' : ''}`}
            >
              <i className="fas fa-heart me-2"></i>
              FAVORITES
              {totalFavorites > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger favorite-count">
                  {totalFavorites}
                  <span className="visually-hidden">favorites count</span>
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="retro-btn d-lg-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="d-lg-none mt-3 pt-3 border-top border-info">
            <div className="d-flex flex-column gap-3">
              <Link 
                to="/" 
                className={`retro-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-home me-2"></i>
                HOME SECTOR
              </Link>
              
              <Link 
                to="/favorites" 
                className={`retro-nav-link position-relative ${isActive('/favorites') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-heart me-2"></i>
                FAVORITES
                {totalFavorites > 0 && (
                  <span className="badge bg-danger ms-2">
                    {totalFavorites}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Hologram effect */}
      <div className="hologram-line"></div>
      
      <style jsx>{`
        .retro-nav {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 15, 0.95),
            rgba(26, 26, 46, 0.95)
          );
          backdrop-filter: blur(20px);
          border-bottom: 2px solid var(--sw-blue);
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
        }

        .retro-nav-brand {
          font-family: 'Audiowide', monospace;
          font-size: 1.8rem;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          transition: all 0.3s ease;
        }

        .retro-nav-brand:hover {
          color: var(--sw-blue);
          text-shadow: var(--neon-glow-blue);
          transform: scale(1.05);
        }

        .retro-nav-link {
          color: var(--sw-cyan);
          text-decoration: none;
          font-family: 'Orbitron', monospace;
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 16px;
          border-radius: 20px;
        }

        .retro-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background: linear-gradient(45deg, var(--sw-blue), var(--sw-purple));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .retro-nav-link:hover,
        .retro-nav-link.active {
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          transform: translateY(-2px);
        }

        .retro-nav-link:hover::before,
        .retro-nav-link.active::before {
          opacity: 0.2;
        }

        .favorite-count {
          background: linear-gradient(45deg, var(--sw-pink), var(--sw-orange)) !important;
          box-shadow: var(--neon-glow-pink);
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          animation: pulse 2s ease-in-out infinite;
        }

        .hologram-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--sw-blue),
            var(--sw-yellow),
            var(--sw-pink),
            transparent
          );
          animation: hologramScan 3s linear infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes hologramScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 768px) {
          .retro-nav-brand {
            font-size: 1.4rem;
          }
          
          .retro-nav-link {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
        }
      `}</style>
    </nav>
  );
};

// Also export as default for flexibility
export default Navbar;