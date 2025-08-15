import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PlanetDetail = () => {
  const { id } = useParams();
  const { actions, swapiService } = useAppContext();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        setLoading(true);
        const planetData = await swapiService.fetchPlanetDetails(id);
        setPlanet(planetData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetDetail();
  }, [id, swapiService]);

  const handleFavoriteClick = () => {
    if (actions.isFavorite('planets', id)) {
      actions.removeFavorite('planets', id);
    } else {
      actions.addFavorite('planets', { uid: id, name: planet.properties.name });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container">
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Error: {error}
      </div>
    </div>
  );
  if (!planet) return (
    <div className="container">
      <div className="alert alert-warning" role="alert">
        Planet not found
      </div>
    </div>
  );

  const { properties } = planet;
  const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  const isFavorite = actions.isFavorite('planets', id);

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {properties.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Planet Image */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <img 
              src={imageUrl} 
              className="card-img-top" 
              alt={properties.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/343a40/ffffff?text=No+Image';
              }}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <button
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'} w-100`}
                onClick={handleFavoriteClick}
              >
                <i className="fas fa-heart me-2"></i>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>

        {/* Planet Details */}
        <div className="col-lg-8 col-md-6">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              <h1 className="card-title mb-0">
                <i className="fas fa-globe me-2"></i>
                {properties.name}
              </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5 className="text-muted">Physical Properties</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Diameter:</strong>
                      <span>{properties.diameter} km</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Gravity:</strong>
                      <span>{properties.gravity}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Surface Water:</strong>
                      <span>{properties.surface_water}%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Population:</strong>
                      <span>{properties.population}</span>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 mb-3">
                  <h5 className="text-muted">Environmental Data</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Climate:</strong>
                      <span className="text-capitalize">{properties.climate}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Terrain:</strong>
                      <span className="text-capitalize">{properties.terrain}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Rotation Period:</strong>
                      <span>{properties.rotation_period} hours</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Orbital Period:</strong>
                      <span>{properties.orbital_period} days</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/" className="btn btn-secondary">
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Planets
                    </Link>
                    <button 
                      className="btn btn-info"
                      onClick={() => window.open(`https://starwars.fandom.com/wiki/${properties.name.replace(' ', '_')}`, '_blank')}
                    >
                      <i className="fas fa-external-link-alt me-2"></i>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;