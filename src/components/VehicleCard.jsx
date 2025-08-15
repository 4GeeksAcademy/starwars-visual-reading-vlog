import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';

const VehicleCard = ({ vehicle }) => {
  const { actions } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate image URL from starwars-visualguide.com
  const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`;
  const fallbackImage = 'https://via.placeholder.com/300x200/1a1a2e/FF4500?text=VEHICLE';
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (actions.isFavorite('vehicles', vehicle.uid)) {
      actions.removeFavorite('vehicles', vehicle.uid);
    } else {
      actions.addFavorite('vehicles', vehicle);
    }
  };

  const isFavorite = actions.isFavorite('vehicles', vehicle.uid);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="retro-card vehicle-card h-100">
        <div className="card-image-container position-relative">
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="retro-spinner"></div>
            </div>
          )}
          
          <img 
            src={imageError ? fallbackImage : imageUrl}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
            alt={vehicle.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Engine thrust overlay */}
          <div className="thrust-overlay"></div>
          
          {/* Favorite button */}
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`fas fa-heart ${isFavorite ? 'text-danger' : ''}`}></i>
          </button>
          
          {/* Vehicle type badge */}
          <div className="vehicle-badge">
            <i className="fas fa-rocket"></i>
            VESSEL
          </div>
        </div>
        
        <div className="card-content">
          <h5 className="vehicle-name" title={vehicle.name}>
            {vehicle.name}
          </h5>
          
          <p className="vehicle-description">
            Advanced starship technology engineered for traversing the vast reaches of hyperspace...
          </p>
          
          <div className="card-actions">
            <Link 
              to={`/vehicle/${vehicle.uid}`} 
              className="retro-btn retro-btn-warning w-100"
            >
              <i className="fas fa-cogs me-2"></i>
              ANALYZE SPECS
            </Link>
          </div>
        </div>
        
        {/* Hyperspace streaks */}
        <div className="hyperspace-streaks">
          <div className="streak streak-1"></div>
          <div className="streak streak-2"></div>
          <div className="streak streak-3"></div>
        </div>
      </div>
      
      <style jsx>{`
        .vehicle-card {
          background: linear-gradient(
            135deg,
            rgba(46, 26, 26, 0.95),
            rgba(96, 52, 15, 0.9)
          );
          border: 2px solid var(--sw-orange);
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
        }

        .vehicle-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 69, 0, 0.1),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
        }

        .vehicle-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--sw-yellow);
          box-shadow: 
            0 20px 60px rgba(255, 69, 0, 0.3),
            0 0 30px var(--sw-orange);
        }

        .vehicle-card:hover::before {
          left: 100%;
        }

        .card-image-container {
          height: 220px;
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
          filter: brightness(0.8) contrast(1.2) saturate(1.1);
        }

        .card-image.loaded {
          opacity: 1;
        }

        .vehicle-card:hover .card-image {
          transform: scale(1.1) skewX(-2deg);
          filter: brightness(1.1) contrast(1.3) saturate(1.4);
        }

        .image-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .thrust-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to top,
            rgba(255, 69, 0, 0.3) 0%,
            rgba(255, 232, 31, 0.2) 30%,
            transparent 100%
          );
          animation: thrustPulse 3s ease-in-out infinite;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .vehicle-card:hover .thrust-overlay {
          opacity: 1;
        }

        .favorite-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(46, 26, 26, 0.9);
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

        .vehicle-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(255, 69, 0, 0.9);
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

        .vehicle-name {
          font-family: 'Audiowide', monospace;
          font-size: 1.3rem;
          color: var(--sw-orange);
          text-shadow: 0 0 10px var(--sw-orange);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vehicle-description {
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .retro-btn-warning {
          border-color: var(--sw-orange);
          color: var(--sw-orange);
        }

        .retro-btn-warning:hover {
          background: var(--sw-orange);
          color: var(--dark-space);
          box-shadow: 0 0 20px var(--sw-orange);
        }

        .hyperspace-streaks {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .vehicle-card:hover .hyperspace-streaks {
          opacity: 1;
        }

        .streak {
          position: absolute;
          width: 2px;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--sw-yellow),
            transparent
          );
          animation: hyperspaceMove 1.5s linear infinite;
        }

        .streak-1 {
          left: 20%;
          animation-delay: 0s;
        }

        .streak-2 {
          left: 50%;
          animation-delay: 0.3s;
        }

        .streak-3 {
          left: 80%;
          animation-delay: 0.6s;
        }

        @keyframes thrustPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes hyperspaceMove {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }

        @media (max-width: 768px) {
          .card-image-container {
            height: 180px;
          }
          
          .vehicle-name {
            font-size: 1.1rem;
          }
          
          .vehicle-description {
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
          
          .streak {
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default VehicleCard;