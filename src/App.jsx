// App.jsx - Main App Component with useEffect
import React, { useState, useEffect } from 'react';
import MoonPhaseDisplay from './components/MoonPhaseDisplay';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import { getCurrentMoonPhase, getNext7Days } from './api/moonApi';

function App() {
  // State management - All state lives in App.jsx
  const [moonData, setMoonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWeekly, setShowWeekly] = useState(false);

  // useEffect - This runs when the app first loads
  useEffect(() => {
    console.log('🌙 App is starting! Loading moon data...');
    
    const fetchInitialMoonData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('📡 Fetching current moon phase from NASA API...');
        
        // Get current moon phase
        const current = await getCurrentMoonPhase();
        
        console.log('Moon data received:', current);
        
        setMoonData({ current });
      } catch (err) {
        console.error('Failed to fetch moon data:', err);
        setError('Failed to load moon data. Please check your internet connection.');
      } finally {
        setLoading(false);
        console.log('Initial loading complete');
      }
    };

    // Call the function to fetch data
    fetchInitialMoonData();
  }, []); // Empty dependency array = runs only once when component mounts

  // Function to load 7-day forecast
  const loadWeeklyData = async () => {
    console.log('Loading 7-day forecast...');
    
    try {
      setLoading(true);
      const weekly = await getNext7Days();
      
      console.log('Weekly data received:', weekly.length + ' days');
      
      // Update moonData by keeping current data and adding weekly data
      setMoonData(prev => ({ ...prev, weekly }));
      setShowWeekly(true);
    } catch (err) {
      console.error('Failed to load weekly data:', err);
      setError('Failed to load weekly forecast. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to hide weekly view
  const hideWeeklyData = () => {
    console.log('Hiding weekly view');
    setShowWeekly(false);
  };

  // Function to retry loading data
  const retryLoading = () => {
    console.log('🔄 Retrying to load data...');
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Conditional rendering based on app state
  if (loading && !moonData) {
    return <LoadingScreen />;
  }

  if (error && !moonData) {
    return <ErrorScreen error={error} onRetry={retryLoading} />;
  }

  // Main app render - pass data and functions to child component
  return (
    <MoonPhaseDisplay 
      moonData={moonData}
      loading={loading}
      error={error}
      onLoadWeekly={loadWeeklyData}
      showWeekly={showWeekly}
      onHideWeekly={hideWeeklyData}
    />
  );
}

export default App;