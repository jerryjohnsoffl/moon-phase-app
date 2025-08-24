// components/LoadingScreen.jsx - Loading Screen Component
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center text-white">
        {/* Animated Moon */}
        <div className="text-8xl mb-6 animate-bounce">
          🌙
        </div>
        
        {/* Loading Text */}
        <div className="text-2xl font-semibold mb-4">
          Loading Moon Phases...
        </div>
        
        {/* Subtitle */}
        <div className="text-purple-200 mb-8">
          Fetching data from US Naval Observatory
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        
        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
        </div>
        
        {/* Fun Loading Messages */}
        <div className="text-sm text-purple-300 mt-6 animate-pulse">
          ✨ Calculating lunar illumination...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;