import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';

const PlanetCard = ({ planet }) => {
  const { actions } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate image URL from starwars-visualguide.com
  const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`;
  const fallbackImage = 'https://via.placeholder.com/300x300/1a1a2e/00FF41?text=PLANET';
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (actions.isFavorite('planets', planet.uid)) {
      actions.removeFavorite('planets', planet.uid);
    } else {
      actions.addFavorite('planets', planet);
    }
  };

  const isFavorite = actions.isFavorite('planets', planet.uid);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="retro-card planet-card h-100">
        <div className="card-image-container position-relative">
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="retro-spinner"></div>
            </div>
          )}
          
          <img 
            src={imageError ? fallbackImage : imageUrl}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
            alt={planet.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Planet atmosphere overlay */}
          <div className="atmosphere-overlay"></div>
          
          {/* Favorite button */}
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`fas fa-heart ${isFavorite ? 'text-danger' : ''}`}></i>
          </button>
          
          {/* Planet type badge */}
          <div className="planet-badge">
            <i className="fas fa-globe"></i>
            WORLD
          </div>
        </div>
        
        <div className="card-content">
          <h5 className="planet-name" title={planet.name}>
            {planet.name}
          </h5>
          
          <p className="planet-description">
            A mysterious world orbiting distant stars, harboring secrets of civilizations past and present...
          </p>
          
          <div className="card-actions">
            <Link 
              to={`/planet/${planet.uid}`} 
              className="retro-btn retro-btn-success w-100"
            >
              <i className="fas fa-satellite me-2"></i>
              EXPLORE WORLD
            </Link>
          </div>
        </div>
        
        {/* Orbital ring effect */}
        <div className="orbital-ring"></div>
      </div>
      
      <style jsx>{`
        .planet-card {
          background: linear-gradient(
            135deg,
            rgba(26, 46, 26, 0.95),
            rgba(15, 96, 52, 0.9)
          );
          border: 2px solid var(--sw-green);
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
        }

        .planet-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 65, 0.1),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
        }

        .planet-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--sw-cyan);
          box-shadow: 
            0 20px 60px rgba(0, 255, 65, 0.3),
            var(--neon-glow-green);
        }

        .planet-card:hover::before {
          left: 100%;
        }

        .card-image-container {
          height: 250px;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
          position: relative;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
          opacity: 0;
          filter: brightness(0.9) contrast(1.1) hue-rotate(10deg);
        }

        .card-image.loaded {
          opacity: 1;
        }

        .planet-card:hover .card-image {
          transform: scale(1.15) rotate(2deg);
          filter: brightness(1.1) contrast(1.2) saturate(1.3);
        }

        .image-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .atmosphere-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 30% 40%,
            rgba(0, 255, 65, 0.2) 0%,
            rgba(0, 212, 255, 0.1) 50%,
            transparent 100%
          );
          animation: atmosphereGlow 4s ease-in-out infinite;
          pointer-events: none;
        }

        .favorite-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(26, 46, 26, 0.9);
          border: 2px solid var(--sw-pink);
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 3;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          box-shadow: var(--neon-glow-pink);
          background: rgba(255, 0, 127, 0.2);
        }

        .favorite-btn.active {
          background: var(--sw-pink);
          color: white;
          animation: heartBeat 0.6s ease-in-out;
        }

        .favorite-btn i {
          font-size: 1.2rem;
          color: var(--sw-pink);
          transition: all 0.3s ease;
        }

        .favorite-btn.active i {
          color: white;
        }

        .planet-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0, 255, 65, 0.9);
          color: var(--dark-space);
          padding: 5px 12px;
          border-radius: 15px;
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .planet-name {
          font-family: 'Audiowide', monospace;
          font-size: 1.3rem;
          color: var(--sw-green);
          text-shadow: var(--neon-glow-green);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .planet-description {
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .retro-btn-success {
          border-color: var(--sw-green);
          color: var(--sw-green);
        }

        .retro-btn-success:hover {
          background: var(--sw-green);
          color: var(--dark-space);
          box-shadow: var(--neon-glow-green);
        }

        .orbital-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(0, 255, 65, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(70deg);
          animation: orbit 8s linear infinite;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .planet-card:hover .orbital-ring {
          opacity: 1;
        }

        @keyframes atmosphereGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotateX(70deg) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(70deg) rotateY(360deg); }
        }

        @media (max-width: 768px) {
          .card-image-container {
            height: 200px;
          }
          
          .planet-name {
            font-size: 1.1rem;
          }
          
          .planet-description {
            font-size: 0.8rem;
          }
          
          .favorite-btn {
            width: 40px;
            height: 40px;
            top: 10px;
            right: 10px;
          }
          
          .favorite-btn i {
            font-size: 1rem;
          }
          
          .orbital-ring {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default PlanetCard;