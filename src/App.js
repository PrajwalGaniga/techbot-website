import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'; // Import the new page
import Projects from './pages/Projects.js'; // Add this import
import Team from './pages/Team.js';
import Workshops from './pages/Workshops';
import Achievements from './pages/Achievements.js';

// Inside your Routes:


// Inside your Routes:


function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} /> {/* Connect the button path */}
          {/* Placeholder for other pages */}
          <Route path="/team" element={<Team/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/achievements" element={<Achievements/>}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;