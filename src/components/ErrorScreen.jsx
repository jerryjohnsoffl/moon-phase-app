// components/ErrorScreen.jsx - Error Screen Component
import React from 'react';

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto p-6">
        {/* Sad Moon Emoji */}
        <div className="text-8xl mb-6 animate-bounce">
          🌚
        </div>
        
        {/* Error Title */}
        <div className="text-2xl font-bold mb-4 text-red-200">
          Oops! Something went wrong
        </div>
        
        {/* Error Message */}
        <div className="text-gray-300 mb-6 bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-500/30">
          <p className="text-sm">{error}</p>
        </div>
        
        {/* Possible Solutions */}
        <div className="text-left text-sm text-purple-200 mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <h4 className="font-semibold mb-2 text-white">Possible solutions:</h4>
          <ul className="space-y-1 text-xs">
            <li>• Check your internet connection</li>
            <li>• The API might be temporarily down</li>
            <li>• Try refreshing the page</li>
            <li>• Wait a moment and try again</li>
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            🔄 Try Again
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-gray-600/80 hover:bg-gray-700/80 backdrop-blur-sm text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            ↻ Refresh Page
          </button>
        </div>
        
        {/* Help Text */}
        <div className="text-xs text-purple-400 mt-6">
          Still having issues? The moon data comes from the US Naval Observatory API.
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;