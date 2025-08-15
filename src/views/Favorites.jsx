import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';

const Favorites = () => {
  const { state, actions } = useAppContext();

  const totalFavorites = (state.favorites?.characters?.length || 0) + 
                        (state.favorites?.planets?.length || 0) + 
                        (state.favorites?.vehicles?.length || 0);

  const renderFavoriteItem = (item, type) => {
    let imageUrl, detailPath, colorClass, icon, buttonClass;
    
    switch (type) {
      case 'characters':
        imageUrl = `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`;
        detailPath = `/character/${item.uid}`;
        colorClass = 'character-favorite';
        icon = 'fas fa-user-astronaut';
        buttonClass = 'retro-btn-primary';
        break;
      case 'planets':
        imageUrl = `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`;
        detailPath = `/planet/${item.uid}`;
        colorClass = 'planet-favorite';
        icon = 'fas fa-globe';
        buttonClass = 'retro-btn-success';
        break;
      case 'vehicles':
        imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`;
        detailPath = `/vehicle/${item.uid}`;
        colorClass = 'vehicle-favorite';
        icon = 'fas fa-rocket';
        buttonClass = 'retro-btn-warning';
        break;
      default:
        return null;
    }

    return (
      <div key={`${type}-${item.uid}`} className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className={`retro-card favorite-item ${colorClass} h-100`}>
          <div className="favorite-image-container">
            <img 
              src={imageUrl} 
              className="favorite-image" 
              alt={item.name}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x200/1a1a2e/${type === 'characters' ? '00D4FF' : type === 'planets' ? '00FF41' : 'FF4500'}?text=${type.toUpperCase()}`;
              }}
            />
            
            {/* Type badge */}
            <div className="type-badge">
              <i className={icon}></i>
              {type.slice(0, -1).toUpperCase()}
            </div>
            
            {/* Hologram effect */}
            <div className="hologram-scan"></div>
          </div>
          
          <div className="favorite-content">
            <h6 className="favorite-name">
              <i className={`${icon} me-2`}></i>
              {item.name}
            </h6>
            
            <div className="favorite-actions">
              <Link 
                to={detailPath} 
                className={`retro-btn ${buttonClass} flex-grow-1 me-2`}
              >
                <i className="fas fa-search me-1"></i>
                VIEW
              </Link>
              
              <button
                className="retro-btn retro-btn-danger favorite-remove-btn"
                onClick={() => actions.removeFavorite(type, item.uid)}
                title="Remove from favorites"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          
          {/* Pulsing glow effect */}
          <div className="favorite-glow"></div>
        </div>
      </div>
    );
  };

  if (totalFavorites === 0) {
    return (
      <div className="container-fluid px-4" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="empty-favorites">
              <div className="empty-icon">
                <i className="fas fa-heart-broken fa-4x"></i>
              </div>
              
              <h1 className="retro-title mb-4">
                NO FAVORITES DETECTED
              </h1>
              
              <p className="retro-subtitle mb-4">
                Your collection archive is currently empty. Begin your exploration to discover fascinating beings, worlds, and vessels.
              </p>
              
              <div className="empty-stats">
                <div className="stat-display">
                  <i className="fas fa-database fa-2x mb-2"></i>
                  <div>0 / ∞</div>
                  <small>ARCHIVED ITEMS</small>
                </div>
              </div>
              
              <Link to="/" className="retro-btn retro-btn-primary mt-4">
                <i className="fas fa-rocket me-2"></i>
                BEGIN EXPLORATION
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4" style={{ paddingTop: '120px' }}>
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="retro-title">
            PERSONAL ARCHIVE
          </h1>
          <p className="retro-subtitle">
            Your curated collection from across the galaxy ({totalFavorites} items archived)
          </p>
          
          {/* Stats display */}
          <div className="favorites-stats">
            <div className="stat-item">
              <i className="fas fa-user-astronaut fa-2x mb-2" style={{ color: 'var(--sw-blue)' }}></i>
              <div>{state.favorites?.characters?.length || 0}</div>
              <small>BEINGS</small>
            </div>
            <div className="stat-item">
              <i className="fas fa-globe fa-2x mb-2" style={{ color: 'var(--sw-green)' }}></i>
              <div>{state.favorites?.planets?.length || 0}</div>
              <small>WORLDS</small>
            </div>
            <div className="stat-item">
              <i className="fas fa-rocket fa-2x mb-2" style={{ color: 'var(--sw-orange)' }}></i>
              <div>{state.favorites?.vehicles?.length || 0}</div>
              <small>VESSELS</small>
            </div>
          </div>
        </div>
      </div>

      {/* Characters Section */}
      {state.favorites?.characters?.length > 0 && (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <h3 className="section-title character-section">
                <i className="fas fa-user-astronaut me-3"></i>
                ARCHIVED BEINGS ({state.favorites.characters.length})
              </h3>
            </div>
          </div>
          <div className="row mb-5">
            {state.favorites.characters.map(character => 
              renderFavoriteItem(character, 'characters')
            )}
          </div>
        </>
      )}

      {/* Planets Section */}
      {state.favorites?.planets?.length > 0 && (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <h3 className="section-title planet-section">
                <i className="fas fa-globe me-3"></i>
                ARCHIVED WORLDS ({state.favorites.planets.length})
              </h3>
            </div>
          </div>
          <div className="row mb-5">
            {state.favorites.planets.map(planet => 
              renderFavoriteItem(planet, 'planets')
            )}
          </div>
        </>
      )}

      {/* Vehicles Section */}
      {state.favorites?.vehicles?.length > 0 && (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <h3 className="section-title vehicle-section">
                <i className="fas fa-rocket me-3"></i>
                ARCHIVED VESSELS ({state.favorites.vehicles.length})
              </h3>
            </div>
          </div>
          <div className="row mb-5">
            {state.favorites.vehicles.map(vehicle => 
              renderFavoriteItem(vehicle, 'vehicles')
            )}
          </div>
        </>
      )}

      {/* Back to exploration */}
      <div className="row mt-5 mb-4">
        <div className="col-12 text-center">
          <Link to="/" className="retro-btn retro-btn-primary">
            <i className="fas fa-arrow-left me-2"></i>
            CONTINUE EXPLORATION
          </Link>
        </div>
      </div>

      <style jsx>{`
        .empty-favorites {
          padding: 3rem 0;
        }

        .empty-icon {
          margin-bottom: 2rem;
          color: var(--sw-pink);
          opacity: 0.7;
          animation: float 3s ease-in-out infinite;
        }

        .empty-stats {
          margin: 2rem 0;
        }

        .stat-display {
          display: inline-block;
          padding: 2rem;
          background: rgba(26, 26, 46, 0.6);
          border: 2px solid var(--sw-blue);
          border-radius: 15px;
          color: var(--sw-cyan);
        }

        .stat-display div {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: var(--sw-yellow);
          margin: 0.5rem 0;
        }

        .stat-display small {
          font-family: 'Electrolize', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .favorites-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(26, 26, 46, 0.6);
          border-radius: 15px;
          border: 1px solid var(--sw-blue);
          min-width: 120px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--neon-glow-blue);
          border-color: var(--sw-yellow);
        }

        .stat-item div {
          font-family: 'Orbitron', monospace;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--sw-yellow);
          margin: 0.5rem 0;
        }

        .stat-item small {
          font-family: 'Electrolize', monospace;
          color: var(--sw-cyan);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .section-title {
          font-family: 'Audiowide', monospace;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          padding: 1rem 0;
          border-bottom: 2px solid;
          position: relative;
        }

        .character-section {
          color: var(--sw-blue);
          border-color: var(--sw-blue);
          text-shadow: var(--neon-glow-blue);
        }

        .planet-section {
          color: var(--sw-green);
          border-color: var(--sw-green);
          text-shadow: var(--neon-glow-green);
        }

        .vehicle-section {
          color: var(--sw-orange);
          border-color: var(--sw-orange);
          text-shadow: 0 0 10px var(--sw-orange);
        }

        .favorite-item {
          transition: all 0.3s ease;
          position: relative;
        }

        .character-favorite {
          border-color: var(--sw-blue);
        }

        .planet-favorite {
          border-color: var(--sw-green);
        }

        .vehicle-favorite {
          border-color: var(--sw-orange);
        }

        .favorite-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }

        .favorite-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
          filter: brightness(0.9);
        }

        .favorite-item:hover .favorite-image {
          transform: scale(1.1);
          filter: brightness(1.1) contrast(1.2);
        }

        .type-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 12px;
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
        }

        .hologram-scan {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 48%,
            rgba(255, 255, 255, 0.1) 49%,
            rgba(255, 255, 255, 0.1) 51%,
            transparent 52%
          );
          background-size: 15px 15px;
          animation: hologramMove 2s linear infinite;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .favorite-item:hover .hologram-scan {
          opacity: 1;
        }

        .favorite-content {
          padding: 1rem;
        }

        .favorite-name {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .favorite-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .favorite-remove-btn {
          padding: 8px 12px;
          min-width: auto;
        }

        .retro-btn-primary {
          border-color: var(--sw-blue);
          color: var(--sw-blue);
        }

        .retro-btn-primary:hover {
          background: var(--sw-blue);
          color: var(--dark-space);
        }

        .retro-btn-success {
          border-color: var(--sw-green);
          color: var(--sw-green);
        }

        .retro-btn-success:hover {
          background: var(--sw-green);
          color: var(--dark-space);
        }

        .retro-btn-warning {
          border-color: var(--sw-orange);
          color: var(--sw-orange);
        }

        .retro-btn-warning:hover {
          background: var(--sw-orange);
          color: var(--dark-space);
        }

        .favorite-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .character-favorite:hover .favorite-glow {
          box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.2);
          opacity: 1;
        }

        .planet-favorite:hover .favorite-glow {
          box-shadow: inset 0 0 20px rgba(0, 255, 65, 0.2);
          opacity: 1;
        }

        .vehicle-favorite:hover .favorite-glow {
          box-shadow: inset 0 0 20px rgba(255, 69, 0, 0.2);
          opacity: 1;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes hologramMove {
          0% { transform: translateX(-20px) translateY(-20px); }
          100% { transform: translateX(20px) translateY(20px); }
        }

        @media (max-width: 768px) {
          .retro-title {
            font-size: 2.5rem;
          }
          
          .favorites-stats {
            gap: 1rem;
          }
          
          .stat-item {
            min-width: 100px;
            padding: 1rem;
          }
          
          .stat-item div {
            font-size: 1.5rem;
          }
          
          .section-title {
            font-size: 1.2rem;
          }
          
          .favorite-image-container {
            height: 150px;
          }
          
          .favorite-actions {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .retro-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Favorites;