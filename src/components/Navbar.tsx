import React from 'react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-[#0f1629]/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center -mt-1">
            <Logo size="small" />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white">How It Works</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Launch App
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}