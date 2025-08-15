import React, { useEffect, useState } from 'react';
import { useAppContext } from '../store/AppContext.jsx';
import CharacterCard from '../components/CharacterCard.jsx';
import PlanetCard from '../components/PlanetCard.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Home = () => {
  const { state, actions } = useAppContext();
  const [activeTab, setActiveTab] = useState('characters');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    if (state.characters.length === 0) {
      actions.fetchCharacters();
    }
    if (state.planets.length === 0) {
      actions.fetchPlanets();
    }
    if (state.vehicles.length === 0) {
      actions.fetchVehicles();
    }
  }, []);

  useEffect(() => {
    // Filter data based on search term and active tab
    let data = [];
    switch (activeTab) {
      case 'characters':
        data = state.characters;
        break;
      case 'planets':
        data = state.planets;
        break;
      case 'vehicles':
        data = state.vehicles;
        break;
      default:
        data = [];
    }

    if (searchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [state, activeTab, searchTerm]);

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'characters': return 'fa-user-astronaut';
      case 'planets': return 'fa-globe';
      case 'vehicles': return 'fa-rocket';
      default: return 'fa-star';
    }
  };

  const getTabCount = (tab) => {
    switch (tab) {
      case 'characters': return state.characters.length;
      case 'planets': return state.planets.length;
      case 'vehicles': return state.vehicles.length;
      default: return 0;
    }
  };

  const renderCards = () => {
    if (state.loading) {
      return (
        <div className="col-12">
          <LoadingSpinner />
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="col-12 text-center py-5">
          <div className="retro-card">
            <i className="fas fa-search fa-3x mb-3" style={{ color: 'var(--sw-cyan)' }}></i>
            <h3 className="retro-subtitle">
              {searchTerm ? 'NO MATCHES FOUND' : 'NO DATA AVAILABLE'}
            </h3>
            {searchTerm && (
              <p style={{ color: 'var(--sw-blue)' }}>
                Try adjusting your search parameters
              </p>
            )}
          </div>
        </div>
      );
    }

    return filteredData.map((item, index) => {
      const cardProps = { key: item.uid || index };
      
      switch (activeTab) {
        case 'characters':
          return <CharacterCard {...cardProps} character={item} />;
        case 'planets':
          return <PlanetCard {...cardProps} planet={item} />;
        case 'vehicles':
          return <VehicleCard {...cardProps} vehicle={item} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="container-fluid px-4" style={{ paddingTop: '120px' }}>
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="retro-title">
            GALACTIC ARCHIVE
          </h1>
          <p className="retro-subtitle">
            EXPLORE THE MYSTERIES OF A GALAXY FAR, FAR AWAY
          </p>
          <div className="hero-stats d-flex justify-content-center gap-4 flex-wrap">
            <div className="stat-item">
              <i className="fas fa-user-astronaut fa-2x mb-2" style={{ color: 'var(--sw-blue)' }}></i>
              <div style={{ color: 'var(--sw-yellow)' }}>{state.characters.length}</div>
              <small style={{ color: 'var(--sw-cyan)' }}>BEINGS</small>
            </div>
            <div className="stat-item">
              <i className="fas fa-globe fa-2x mb-2" style={{ color: 'var(--sw-green)' }}></i>
              <div style={{ color: 'var(--sw-yellow)' }}>{state.planets.length}</div>
              <small style={{ color: 'var(--sw-cyan)' }}>WORLDS</small>
            </div>
            <div className="stat-item">
              <i className="fas fa-rocket fa-2x mb-2" style={{ color: 'var(--sw-pink)' }}></i>
              <div style={{ color: 'var(--sw-yellow)' }}>{state.vehicles.length}</div>
              <small style={{ color: 'var(--sw-cyan)' }}>VESSELS</small>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="retro-tabs d-flex justify-content-center gap-3 flex-wrap">
            {['characters', 'planets', 'vehicles'].map((tab) => (
              <button
                key={tab}
                className={`retro-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <i className={`fas ${getTabIcon(tab)} me-2`}></i>
                {tab.toUpperCase()}
                <span className="tab-count">({getTabCount(tab)})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="retro-card border-danger">
              <div className="text-center">
                <i className="fas fa-exclamation-triangle fa-2x mb-3" style={{ color: 'var(--sw-pink)' }}></i>
                <h4 style={{ color: 'var(--sw-pink)' }}>SYSTEM ERROR</h4>
                <p style={{ color: 'var(--sw-cyan)' }}>{state.error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="row">
        {renderCards()}
      </div>

      <style jsx>{`
        .hero-stats {
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
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
          font-size: 2rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }

        .stat-item small {
          font-family: 'Electrolize', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .retro-tabs {
          padding: 1rem 0;
        }

        .retro-tab-btn {
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          padding: 15px 25px;
          border: 2px solid var(--sw-blue);
          background: rgba(26, 26, 46, 0.8);
          color: var(--sw-cyan);
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .retro-tab-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 212, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }

        .retro-tab-btn:hover,
        .retro-tab-btn.active {
          color: var(--sw-yellow);
          border-color: var(--sw-yellow);
          box-shadow: var(--neon-glow-yellow);
          transform: translateY(-3px);
        }

        .retro-tab-btn:hover::before,
        .retro-tab-btn.active::before {
          left: 100%;
        }

        .retro-tab-btn.active {
          background: rgba(255, 232, 31, 0.1);
        }

        .tab-count {
          margin-left: 8px;
          padding: 2px 8px;
          background: rgba(0, 212, 255, 0.3);
          border-radius: 10px;
          font-size: 0.8rem;
        }

        .retro-tab-btn.active .tab-count {
          background: rgba(255, 232, 31, 0.3);
        }

        @media (max-width: 768px) {
          .retro-title {
            font-size: 2.5rem;
          }
          
          .retro-subtitle {
            font-size: 1rem;
          }
          
          .hero-stats {
            gap: 1rem !important;
          }
          
          .stat-item {
            min-width: 100px;
            padding: 0.8rem;
          }
          
          .stat-item div {
            font-size: 1.5rem;
          }
          
          .retro-tab-btn {
            padding: 12px 20px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;