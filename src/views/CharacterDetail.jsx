import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const CharacterDetail = () => {
  const { id } = useParams();
  const { actions, swapiService } = useAppContext();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        const characterData = await swapiService.fetchPersonDetails(id);
        setCharacter(characterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [id, swapiService]);

  const handleFavoriteClick = () => {
    if (actions.isFavorite('characters', id)) {
      actions.removeFavorite('characters', id);
    } else {
      actions.addFavorite('characters', { uid: id, name: character.properties.name });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <div className="retro-card border-danger">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle fa-2x mb-3" style={{ color: 'var(--sw-pink)' }}></i>
          <h4 style={{ color: 'var(--sw-pink)' }}>SYSTEM ERROR</h4>
          <p style={{ color: 'var(--sw-cyan)' }}>Error: {error}</p>
        </div>
      </div>
    </div>
  );
  if (!character) return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <div className="retro-card">
        <div className="text-center">
          <h4 style={{ color: 'var(--sw-yellow)' }}>Character not found</h4>
        </div>
      </div>
    </div>
  );

  const { properties } = character;
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  const isFavorite = actions.isFavorite('characters', id);

  return (
    <div className="container-fluid px-4" style={{ paddingTop: '120px' }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-transparent">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'var(--sw-cyan)' }}>Home Sector</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" style={{ color: 'var(--sw-yellow)' }}>
            {properties.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Character Image */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="retro-card character-detail-card">
            <img 
              src={imageUrl} 
              className="character-detail-image" 
              alt={properties.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600/1a1a2e/00D4FF?text=CHARACTER';
              }}
            />
            <div className="character-actions p-3">
              <button
                className={`retro-btn w-100 ${isFavorite ? 'retro-btn-danger' : 'retro-btn-primary'}`}
                onClick={handleFavoriteClick}
              >
                <i className="fas fa-heart me-2"></i>
                {isFavorite ? 'REMOVE FROM ARCHIVE' : 'ADD TO ARCHIVE'}
              </button>
            </div>
          </div>
        </div>

        {/* Character Details */}
        <div className="col-lg-8 col-md-6">
          <div className="retro-card character-info h-100">
            <div className="card-header">
              <h1 className="character-title mb-0">
                <i className="fas fa-user-astronaut me-3"></i>
                {properties.name}
              </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 className="section-title">PHYSICAL DATA</h5>
                  <div className="data-grid">
                    <div className="data-item">
                      <span className="data-label">Height:</span>
                      <span className="data-value">{properties.height} cm</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Mass:</span>
                      <span className="data-value">{properties.mass} kg</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Hair Color:</span>
                      <span className="data-value">{properties.hair_color}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Skin Color:</span>
                      <span className="data-value">{properties.skin_color}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Eye Color:</span>
                      <span className="data-value">{properties.eye_color}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="section-title">BIOGRAPHICAL DATA</h5>
                  <div className="data-grid">
                    <div className="data-item">
                      <span className="data-label">Birth Year:</span>
                      <span className="data-value">{properties.birth_year}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Gender:</span>
                      <span className="data-value">{properties.gender}</span>
                    </div>
                    <div className="data-item">
                      <span className="data-label">Homeworld:</span>
                      <span className="data-value">
                        <i className="fas fa-globe text-success me-1"></i>
                        {properties.homeworld}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="action-buttons">
                    <Link to="/" className="retro-btn retro-btn-secondary me-3">
                      <i className="fas fa-arrow-left me-2"></i>
                      RETURN TO ARCHIVE
                    </Link>
                    <button 
                      className="retro-btn retro-btn-info"
                      onClick={() => window.open(`https://starwars.fandom.com/wiki/${properties.name.replace(' ', '_')}`, '_blank')}
                    >
                      <i className="fas fa-external-link-alt me-2"></i>
                      EXTERNAL DATABASE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .character-detail-card {
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(15, 52, 96, 0.9));
          border: 2px solid var(--sw-blue);
          overflow: hidden;
        }

        .character-detail-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          filter: brightness(0.9) contrast(1.1);
          transition: all 0.3s ease;
        }

        .character-detail-card:hover .character-detail-image {
          filter: brightness(1.1) contrast(1.2);
          transform: scale(1.05);
        }

        .character-info {
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(15, 52, 96, 0.9));
          border: 2px solid var(--sw-blue);
        }

        .card-header {
          background: linear-gradient(45deg, var(--sw-blue), var(--sw-purple));
          padding: 1.5rem;
          border-bottom: 2px solid var(--sw-yellow);
        }

        .character-title {
          font-family: 'Audiowide', monospace;
          color: white;
          text-shadow: var(--neon-glow-yellow);
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--sw-blue);
          padding-bottom: 0.5rem;
        }

        .data-grid {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .data-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: rgba(26, 26, 46, 0.6);
          border-radius: 8px;
          border: 1px solid rgba(0, 212, 255, 0.3);
          transition: all 0.3s ease;
        }

        .data-item:hover {
          border-color: var(--sw-yellow);
          background: rgba(26, 26, 46, 0.8);
          transform: translateX(5px);
        }

        .data-label {
          font-family: 'Electrolize', monospace;
          color: var(--sw-cyan);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .data-value {
          font-family: 'Orbitron', monospace;
          color: var(--sw-yellow);
          font-weight: 500;
          text-transform: capitalize;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .retro-btn-secondary {
          border-color: var(--sw-cyan);
          color: var(--sw-cyan);
        }

        .retro-btn-secondary:hover {
          background: var(--sw-cyan);
          color: var(--dark-space);
        }

        .retro-btn-info {
          border-color: var(--sw-purple);
          color: var(--sw-purple);
        }

        .retro-btn-info:hover {
          background: var(--sw-purple);
          color: white;
        }

        @media (max-width: 768px) {
          .character-title {
            font-size: 1.5rem;
          }
          
          .character-detail-image {
            height: 400px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .retro-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CharacterDetail;