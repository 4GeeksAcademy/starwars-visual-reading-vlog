import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  characters: [],
  planets: [],
  vehicles: [],
  favorites: {
    characters: [],
    planets: [],
    vehicles: []
  },
  loading: false,
  error: null
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_PLANETS: 'SET_PLANETS',
  SET_VEHICLES: 'SET_VEHICLES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  LOAD_FAVORITES: 'LOAD_FAVORITES'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.SET_CHARACTERS:
      return { ...state, characters: action.payload, loading: false };
    
    case actionTypes.SET_PLANETS:
      return { ...state, planets: action.payload, loading: false };
    
    case actionTypes.SET_VEHICLES:
      return { ...state, vehicles: action.payload, loading: false };
    
    case actionTypes.ADD_FAVORITE:
      const { type, item } = action.payload;
      const newFavorites = {
        ...state.favorites,
        [type]: [...state.favorites[type], item]
      };
      // Save to localStorage
      localStorage.setItem('starwars_favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    
    case actionTypes.REMOVE_FAVORITE:
      const { type: removeType, id } = action.payload;
      const updatedFavorites = {
        ...state.favorites,
        [removeType]: state.favorites[removeType].filter(item => item.uid !== id)
      };
      // Save to localStorage
      localStorage.setItem('starwars_favorites', JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    
    case actionTypes.LOAD_FAVORITES:
      return { ...state, favorites: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// SWAPI Service with environment variable
const SWAPI_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.swapi.tech/api';

const swapiService = {
  async fetchPeople() {
    const response = await fetch(`${SWAPI_BASE_URL}/people`);
    const data = await response.json();
    return data.results;
  },

  async fetchPlanets() {
    const response = await fetch(`${SWAPI_BASE_URL}/planets`);
    const data = await response.json();
    return data.results;
  },

  async fetchVehicles() {
    const response = await fetch(`${SWAPI_BASE_URL}/vehicles`);
    const data = await response.json();
    return data.results;
  },

  async fetchPersonDetails(id) {
    const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
    const data = await response.json();
    return data.result;
  },

  async fetchPlanetDetails(id) {
    const response = await fetch(`${SWAPI_BASE_URL}/planets/${id}`);
    const data = await response.json();
    return data.result;
  },

  async fetchVehicleDetails(id) {
    const response = await fetch(`${SWAPI_BASE_URL}/vehicles/${id}`);
    const data = await response.json();
    return data.result;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load favorites from localStorage on app start
  useEffect(() => {
    const savedFavorites = localStorage.getItem('starwars_favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: actionTypes.LOAD_FAVORITES, payload: favorites });
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Actions
  const actions = {
    async fetchCharacters() {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        // Check localStorage first
        const cached = localStorage.getItem('starwars_characters');
        if (cached) {
          const characters = JSON.parse(cached);
          dispatch({ type: actionTypes.SET_CHARACTERS, payload: characters });
          return;
        }

        const characters = await swapiService.fetchPeople();
        localStorage.setItem('starwars_characters', JSON.stringify(characters));
        dispatch({ type: actionTypes.SET_CHARACTERS, payload: characters });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    },

    async fetchPlanets() {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        // Check localStorage first
        const cached = localStorage.getItem('starwars_planets');
        if (cached) {
          const planets = JSON.parse(cached);
          dispatch({ type: actionTypes.SET_PLANETS, payload: planets });
          return;
        }

        const planets = await swapiService.fetchPlanets();
        localStorage.setItem('starwars_planets', JSON.stringify(planets));
        dispatch({ type: actionTypes.SET_PLANETS, payload: planets });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    },

    async fetchVehicles() {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        // Check localStorage first
        const cached = localStorage.getItem('starwars_vehicles');
        if (cached) {
          const vehicles = JSON.parse(cached);
          dispatch({ type: actionTypes.SET_VEHICLES, payload: vehicles });
          return;
        }

        const vehicles = await swapiService.fetchVehicles();
        localStorage.setItem('starwars_vehicles', JSON.stringify(vehicles));
        dispatch({ type: actionTypes.SET_VEHICLES, payload: vehicles });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    },

    addFavorite(type, item) {
      // Check if already in favorites
      const exists = state.favorites[type].some(fav => fav.uid === item.uid);
      if (!exists) {
        dispatch({ 
          type: actionTypes.ADD_FAVORITE, 
          payload: { type, item } 
        });
      }
    },

    removeFavorite(type, id) {
      dispatch({ 
        type: actionTypes.REMOVE_FAVORITE, 
        payload: { type, id } 
      });
    },

    isFavorite(type, id) {
      return state.favorites[type].some(item => item.uid === id);
    }
  };

  return (
    <AppContext.Provider value={{ state, actions, swapiService }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};