import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LearnMore from './components/LearnMore';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f1629]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
