import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import CharacterDetail from './views/CharacterDetail.jsx';
import PlanetDetail from './views/PlanetDetail.jsx';
import VehicleDetail from './views/VehicleDetail.jsx';
import Favorites from './views/Favorites.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // Get basename from environment variable
  const basename = import.meta.env.BASENAME || '/';
  
  return (
    <AppProvider>
      <Router basename={basename}>
        <div className="App">
          <Navbar />
          <div className="container-fluid py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
              <Route path="/planet/:id" element={<PlanetDetail />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;