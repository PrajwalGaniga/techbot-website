import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'; 
import Projects from './pages/Projects.js'; 
import Team from './pages/Team.js';
import Workshops from './pages/Workshops';
import Achievements from './pages/Achievements.js';

// --- SCROLL TO TOP HELPER ---
// This component listens to route changes and resets scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* Activates the scroll reset behavior */}
      <ScrollToTop />
      
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/team" element={<Team/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/achievements" element={<Achievements/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;