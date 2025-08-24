// utils/moonUtils.js - Helper functions for moon phase app

/**
 * Get appropriate moon emoji based on phase name and illumination
 * @param {string} phaseName - Name of the moon phase
 * @param {number} illumination - Illumination percentage (0-100)
 * @returns {string} Moon emoji
 */
export const getMoonEmoji = (phaseName, illumination = 50) => {
  // If no phase name provided, return default moon
  if (!phaseName) return '🌙';
  
  // Convert to lowercase for easier matching
  const phase = phaseName.toLowerCase();
  
  // Map phase names to emojis
  if (phase.includes('new')) return '🌑'; // New Moon
  if (phase.includes('waxing crescent')) return '🌒'; // Waxing Crescent
  if (phase.includes('first quarter')) return '🌓'; // First Quarter
  if (phase.includes('waxing gibbous')) return '🌔'; // Waxing Gibbous
  if (phase.includes('full')) return '🌕'; // Full Moon
  if (phase.includes('waning gibbous')) return '🌖'; // Waning Gibbous
  if (phase.includes('last quarter') || phase.includes('third quarter')) return '🌗'; // Last Quarter
  if (phase.includes('waning crescent')) return '🌘'; // Waning Crescent
  
}