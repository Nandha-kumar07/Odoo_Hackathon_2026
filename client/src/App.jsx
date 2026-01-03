import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/design-system.css';
import './App.css';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import MainLanding from './pages/MainLanding';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';
import TripListing from './pages/TripListing';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ItineraryView from './pages/ItineraryView';
import Community from './pages/Community';
import Calendar from './pages/Calendar';
import AdminPanel from './pages/AdminPanel';
import Budget from './pages/Budget';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<MainLanding />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/build-itinerary" element={<BuildItinerary />} />
          <Route path="/trips" element={<TripListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/itinerary/:id" element={<ItineraryView />} />
          <Route path="/community" element={<Community />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
