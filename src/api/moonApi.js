import Suncalc from "suncalc"
const API_BASE = 'https://aa.usno.navy.mil/api';

// Default location: Thrissur, Kerala, India
const DEFAULT_COORDINATES = {
  lat: 10.5276,
  lon: 76.2144,
  timezone: 5.5 // IST timezone (UTC + 5:30)
};

/**
 * Get current moon phase for today
 * @param {number} lat - Latitude (default: Thrissur)
 * @param {number} lon - Longitude (default: Thrissur) 
 * @param {number} timezone - Timezone offset (default: IST)
 * @returns {Promise<Object>} Current moon phase data
 */
export const getCurrentMoonPhase = async (
  lat = DEFAULT_COORDINATES.lat, 
  lon = DEFAULT_COORDINATES.lon, 
  timezone = DEFAULT_COORDINATES.timezone
) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    console.log(`🌙 Fetching moon phase for ${today} at coordinates: ${lat}, ${lon}`);
    
    // Build API URL
    const url = `${API_BASE}/rstt/oneday?date=${today}&coords=${lat},${lon}&tz=${timezone}&id=moonapp`;
    
    console.log('📡 API URL:', url);
    
    // Make API request
    const response = await fetch(url);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Check for API-specific errors
    if (data.error) {
      throw new Error(`API Error: ${data.error}`);
    }
    
    // Extract moon data from response
    const moonInfo = data.properties.data;
    
    // Return formatted data
    const result = {
      phase: moonInfo.curphase,
      illumination: Math.round(moonInfo.fracillum * 100), // Convert to percentage
      date: today,
      closestPhase: moonInfo.closestphase,
      moonData: moonInfo.moondata // Additional moon events for today
    };
    
    console.log('✅ Current moon phase data:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching current moon phase:', error);
    throw new Error(`Failed to get current moon phase: ${error.message}`);
  }
};

/**
 * Get moon phases for the next 7 days
 * @param {number} lat - Latitude (default: Thrissur)
 * @param {number} lon - Longitude (default: Thrissur)
 * @param {number} timezone - Timezone offset (default: IST)
 * @returns {Promise<Array>} Array of moon phase data for 7 days
 */
export const getNext7Days = async (
  lat = DEFAULT_COORDINATES.lat, 
  lon = DEFAULT_COORDINATES.lon, 
  timezone = DEFAULT_COORDINATES.timezone
) => {
  try {
    console.log('📅 Fetching 7-day moon phase forecast...');
    
    const phases = [];
    const today = new Date();
    
    // Loop through next 7 days (including today)
    for (let i = 0; i <= 6; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      console.log(`📡 Fetching day ${i + 1}/7: ${dateStr}`);
      
      // Build API URL for this date
      const url = `${API_BASE}/rstt/oneday?date=${dateStr}&coords=${lat},${lon}&tz=${timezone}&id=moonapp`;
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          console.warn(`⚠️ Failed to fetch data for ${dateStr}: ${response.status}`);
          continue; // Skip this day and continue
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.warn(`⚠️ API error for ${dateStr}: ${data.error}`);
          continue; // Skip this day and continue
        }
        
        // Format the data for this day
        const dayData = {
          date: dateStr,
          dayName: currentDate.toLocaleDateString('en', { weekday: 'short' }),
          fullDate: currentDate.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
          phase: data.properties.data.curphase,
          illumination: Math.round(data.properties.data.fracillum * 100)
        };
        
        phases.push(dayData);
        
        // Small delay to be respectful to the API (avoid rate limiting)
        if (i < 6) { // Don't delay after the last request
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
      } catch (dayError) {
        console.warn(`⚠️ Error fetching data for ${dateStr}:`, dayError.message);
        // Continue with next day instead of failing completely
      }
    }
    
    console.log(`✅ Successfully fetched ${phases.length}/7 days of moon data`);
    
    if (phases.length === 0) {
      throw new Error('No moon phase data could be retrieved for any day');
    }
    
    return phases;
    
  } catch (error) {
    console.error('❌ Error fetching 7-day moon phases:', error);
    throw new Error(`Failed to get 7-day forecast: ${error.message}`);
  }
};

/**
 * Get upcoming primary moon phases (New, First Quarter, Full, Last Quarter)
 * @param {number} numPhases - Number of phases to get (default: 8)
 * @returns {Promise<Array>} Array of primary moon phases
 */
export const getPrimaryMoonPhases = async (numPhases = 8) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    console.log(`🌙 Fetching ${numPhases} primary moon phases starting from ${today}`);
    
    const url = `${API_BASE}/moon/phases/date?date=${today}&nump=${numPhases}&id=moonapp`;
    
    console.log('📡 Primary phases API URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`API Error: ${data.error}`);
    }
    
    // Format the phase data
    const formattedPhases = data.phasedata.map(phase => ({
      phase: phase.phase,
      date: `${phase.year}-${phase.month.toString().padStart(2, '0')}-${phase.day.toString().padStart(2, '0')}`,
      time: phase.time,
      year: phase.year,
      month: phase.month,
      day: phase.day
    }));
    
    console.log('✅ Primary moon phases data:', formattedPhases);
    return formattedPhases;
    
  } catch (error) {
    console.error('❌ Error fetching primary moon phases:', error);
    throw new Error(`Failed to get primary moon phases: ${error.message}`);
  }
};

/**
 * Get all moon data (current + weekly + primary phases) in parallel
 * @param {number} lat - Latitude (default: Thrissur)
 * @param {number} lon - Longitude (default: Thrissur)
 * @param {number} timezone - Timezone offset (default: IST)
 * @returns {Promise<Object>} Complete moon data object
 */
export const getAllMoonData = async (
  lat = DEFAULT_COORDINATES.lat, 
  lon = DEFAULT_COORDINATES.lon, 
  timezone = DEFAULT_COORDINATES.timezone
) => {
  try {
    console.log('🚀 Fetching all moon data in parallel...');
    
    // Fetch all data simultaneously for better performance
    const [currentPhase, weeklyPhases, primaryPhases] = await Promise.all([
      getCurrentMoonPhase(lat, lon, timezone),
      getNext7Days(lat, lon, timezone),
      getPrimaryMoonPhases(8)
    ]);
    
    const result = {
      current: currentPhase,
      weekly: weeklyPhases,
      primary: primaryPhases
    };
    
    console.log('✅ All moon data fetched successfully');
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching all moon data:', error);
    throw new Error(`Failed to get complete moon data: ${error.message}`);
  }
};