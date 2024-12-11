import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseProvider, useSupabase } from './contexts/SupabaseContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LearnMore from './components/LearnMore';
import About from './components/About';
import Login from './components/auth/Login';
import CreateProfile from './components/auth/CreateProfile';
import ImageUpload from './components/upload/ImageUpload';
import Processing from './components/analysis/Processing';
import Results from './components/analysis/Results';
import AuthCallback from './components/auth/AuthCallback';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useSupabase();
  
  if (loading) {
    return <div className="min-h-screen bg-[#0f1629] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f1629]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/create-profile" element={
            <ProtectedRoute>
              <CreateProfile />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <SupabaseProvider>
      <AppRoutes />
    </SupabaseProvider>
  );
}

export default App;
