import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';

const CharacterCard = ({ character }) => {
  const { actions } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate image URL from starwars-visualguide.com
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`;
  const fallbackImage = 'https://via.placeholder.com/300x400/1a1a2e/00D4FF?text=CHARACTER';
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (actions.isFavorite('characters', character.uid)) {
      actions.removeFavorite('characters', character.uid);
    } else {
      actions.addFavorite('characters', character);
    }
  };

  const isFavorite = actions.isFavorite('characters', character.uid);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="retro-card character-card h-100">
        <div className="card-image-container position-relative">
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="retro-spinner"></div>
            </div>
          )}
          
          <img 
            src={imageError ? fallbackImage : imageUrl}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
            alt={character.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Hologram overlay */}
          <div className="hologram-overlay"></div>
          
          {/* Favorite button */}
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`fas fa-heart ${isFavorite ? 'text-danger' : ''}`}></i>
          </button>
          
          {/* Character type badge */}
          <div className="character-badge">
            <i className="fas fa-user-astronaut"></i>
            BEING
          </div>
        </div>
        
        <div className="card-content">
          <h5 className="character-name" title={character.name}>
            {character.name}
          </h5>
          
          <p className="character-description">
            A mysterious being from the vast reaches of the galaxy, waiting to reveal their secrets...
          </p>
          
          <div className="card-actions">
            <Link 
              to={`/character/${character.uid}`} 
              className="retro-btn retro-btn-primary w-100"
            >
              <i className="fas fa-search me-2"></i>
              SCAN DATA
            </Link>
          </div>
        </div>
        
        {/* Data stream effect */}
        <div className="data-stream"></div>
      </div>
      
      <style jsx>{`
        .character-card {
          background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.95),
            rgba(15, 52, 96, 0.9)
          );
          border: 2px solid var(--sw-blue);
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
        }

        .character-card::before {
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
          z-index: 1;
        }

        .character-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--sw-yellow);
          box-shadow: 
            0 20px 60px rgba(255, 232, 31, 0.3),
            var(--neon-glow-yellow);
        }

        .character-card:hover::before {
          left: 100%;
        }

        .card-image-container {
          height: 300px;
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
          filter: brightness(0.8) contrast(1.2);
        }

        .card-image.loaded {
          opacity: 1;
        }

        .character-card:hover .card-image {
          transform: scale(1.1);
          filter: brightness(1) contrast(1.3) saturate(1.2);
        }

        .image-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .hologram-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 48%,
            rgba(0, 212, 255, 0.1) 49%,
            rgba(0, 212, 255, 0.1) 51%,
            transparent 52%
          );
          background-size: 20px 20px;
          animation: hologramScan 3s linear infinite;
          pointer-events: none;
        }

        .favorite-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(26, 26, 46, 0.9);
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

        .character-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0, 212, 255, 0.9);
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

        .character-name {
          font-family: 'Audiowide', monospace;
          font-size: 1.3rem;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .character-description {
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .retro-btn-primary {
          border-color: var(--sw-blue);
          color: var(--sw-blue);
        }

        .retro-btn-primary:hover {
          background: var(--sw-blue);
          color: var(--dark-space);
          box-shadow: var(--neon-glow-blue);
        }

        .data-stream {
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--sw-green),
            transparent
          );
          animation: dataFlow 2s ease-in-out infinite;
          opacity: 0.7;
        }

        @keyframes hologramScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes dataFlow {
          0%, 100% { transform: translateY(-20px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .card-image-container {
            height: 250px;
          }
          
          .character-name {
            font-size: 1.1rem;
          }
          
          .character-description {
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
        }
      `}</style>
    </div>
  );
};

export default CharacterCard;