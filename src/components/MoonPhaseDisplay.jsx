// components/MoonPhaseDisplay.jsx - Main UI Component
import React from 'react';
import { getMoonEmoji } from '../utils/moonUtils';

const MoonPhaseDisplay = ({ 
  moonData, 
  loading, 
  error, 
  onLoadWeekly, 
  showWeekly, 
  onHideWeekly 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
      {/* Header Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          🌙 Moon Phase Tracker
        </h1>
        <p className="text-purple-200 text-lg">
          Track the moon's journey through its phases
        </p>
      </div>

      {/* Today's Moon Phase - Main Card */}
      {moonData && (
        <div className="max-w-md mx-auto px-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-purple-100">
              Today's Moon Phase
            </h2>
            
            {/* Big Moon Emoji */}
            <div className="text-8xl mb-4 animate-pulse">
              {getMoonEmoji(moonData.current.phase, moonData.current.illumination)}
            </div>
            
            {/* Phase Name */}
            <div className="text-2xl font-bold mb-2 capitalize text-yellow-200">
              {moonData.current.phase}
            </div>
            
            {/* Illumination Percentage */}
            <div className="text-lg text-purple-200 mb-4">
              {moonData.current.illumination}% Illuminated
            </div>
            
            {/* Progress Bar for Illumination */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${moonData.current.illumination}%` }}
              ></div>
            </div>
            
            {/* Current Date */}
            <div className="text-purple-300 text-sm">
              {new Date().toLocaleDateString('en', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      )}

      {/* Next 7 Days Button */}
      <div className="text-center mb-8">
        {!showWeekly ? (
          <button
            onClick={onLoadWeekly}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              '📅 Show Next 7 Days'
            )}
          </button>
        ) : (
          <button
            onClick={onHideWeekly}
            className="bg-gray-600/80 hover:bg-gray-700/80 backdrop-blur-sm text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            ✕ Hide Weekly View
          </button>
        )}
      </div>

      {/* 7-Day Forecast Grid */}
      {showWeekly && moonData?.weekly && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            🗓️ Next 7 Days Forecast
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {moonData.weekly.map((day, index) => (
              <div 
                key={index} 
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center text-white transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-lg border border-white/10 ${
                  index === 0 ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {/* Today Badge */}
                {index === 0 && (
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
                    TODAY
                  </div>
                )}
                
                {/* Day Name */}
                <div className="text-lg font-semibold text-purple-100 mb-1">
                  {day.dayName}
                </div>
                
                {/* Date */}
                <div className="text-sm text-purple-200 mb-3">
                  {day.fullDate}
                </div>
                
                {/* Moon Emoji */}
                <div className="text-4xl mb-3">
                  {getMoonEmoji(day.phase, day.illumination)}
                </div>
                
                {/* Phase Name */}
                <div className="text-sm font-medium mb-2 capitalize">
                  {day.phase}
                </div>
                
                {/* Illumination */}
                <div className="text-xs text-purple-300 mb-2">
                  {day.illumination}% illuminated
                </div>
                
                {/* Mini Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-yellow-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${day.illumination}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message (if any) */}
      {error && moonData && (
        <div className="max-w-md mx-auto px-4 mb-8">
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 text-center text-white">
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8 text-purple-300">
        <p className="text-sm">
          Data provided by US Naval Observatory
        </p>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MoonPhaseDisplay;