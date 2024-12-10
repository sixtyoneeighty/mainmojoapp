import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time - replace with actual API call
    const timer = setTimeout(() => {
      navigate('/results');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f1629] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mb-8"></div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Analyzing your image
        </h2>
        <p className="text-gray-400">
          This might take a few seconds...
        </p>
      </div>
    </div>
  );
};

export default Processing;
