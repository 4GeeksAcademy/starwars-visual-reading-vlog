import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext.jsx';
import { Layout } from './pages/Layout.jsx';                    // ✅ Changed to named import
import Home from './pages/Home.jsx';
import CharacterDetail from './views/CharacterDetail.jsx';
import PlanetDetail from './views/PlanetDetail.jsx';
import VehicleDetail from './views/VehicleDetail.jsx';
import Favorites from './views/Favorites.jsx';
import GalaxyBackground from './components/GalaxyBackground.jsx';
import './assets/css/starwars.css';  // ✅ This line should be there
import './App.css';

function App() {
  const basename = import.meta.env.BASENAME || '/';
  
  return (
    <AppProvider>
      <div className="app-container">
        <GalaxyBackground />
        <Router basename={basename}>
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="character/:id" element={<CharacterDetail />} />
                <Route path="planet/:id" element={<PlanetDetail />} />
                <Route path="vehicle/:id" element={<VehicleDetail />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;