import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

const VehicleDetail = () => {
  const { id } = useParams();
  const { actions, swapiService } = useAppContext();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetail = async () => {
      try {
        setLoading(true);
        const vehicleData = await swapiService.fetchVehicleDetails(id);
        setVehicle(vehicleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetail();
  }, [id, swapiService]);

  const handleFavoriteClick = () => {
    if (actions.isFavorite('vehicles', id)) {
      actions.removeFavorite('vehicles', id);
    } else {
      actions.addFavorite('vehicles', { uid: id, name: vehicle.properties.name });
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
  if (!vehicle) return (
    <div className="container">
      <div className="alert alert-warning" role="alert">
        Vehicle not found
      </div>
    </div>
  );

  const { properties } = vehicle;
  const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
  const isFavorite = actions.isFavorite('vehicles', id);

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
        {/* Vehicle Image */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <img 
              src={imageUrl} 
              className="card-img-top" 
              alt={properties.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/343a40/ffffff?text=No+Image';
              }}
              style={{ height: '300px', objectFit: 'cover' }}
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

        {/* Vehicle Details */}
        <div className="col-lg-8 col-md-6">
          <div className="card h-100">
            <div className="card-header bg-warning text-dark">
              <h1 className="card-title mb-0">
                <i className="fas fa-rocket me-2"></i>
                {properties.name}
              </h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5 className="text-muted">Specifications</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Model:</strong>
                      <span>{properties.model}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Manufacturer:</strong>
                      <span>{properties.manufacturer}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Class:</strong>
                      <span className="text-capitalize">{properties.vehicle_class}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Length:</strong>
                      <span>{properties.length} m</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Cost:</strong>
                      <span>{properties.cost_in_credits} credits</span>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 mb-3">
                  <h5 className="text-muted">Performance</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Max Speed:</strong>
                      <span>{properties.max_atmosphering_speed} km/h</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Crew:</strong>
                      <span>{properties.crew}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Passengers:</strong>
                      <span>{properties.passengers}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Cargo Capacity:</strong>
                      <span>{properties.cargo_capacity} kg</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Consumables:</strong>
                      <span>{properties.consumables}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/" className="btn btn-secondary">
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Vehicles
                    </Link>
                    <button 
                      className="btn btn-info"
                      onClick={() => window.open(`https://starwars.fandom.com/wiki/${properties.name.replace(/[\s\/]/g, '_')}`, '_blank')}
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

export default VehicleDetail;