/**
 * Generates an SVG string for a can product.
 * @param {string} fillColor - The fill color for the can body.
 * @param {string} label - The label to display on the can.
 * @returns {string} SVG markup for the can.
 */
export const createCan = (fillColor, label) =>
  `<svg width="60" height="100" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="50" height="90" rx="8" fill="${fillColor}" stroke="#333" stroke-width="2"/><rect x="10" y="10" width="40" height="15" fill="silver" rx="3"/><text x="30" y="60" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">${label.substring(
    0,
    4,
  )}</text></svg>`;

/**
 * Generates an SVG string for a bottle product.
 * @param {string} fillColor - The fill color for the bottle body.
 * @param {string} label - The label to display on the bottle.
 * @returns {string} SVG markup for the bottle.
 */
export const createBottle = (fillColor, label) =>
  `<svg width="50" height="110" viewBox="0 0 50 110" xmlns="http://www.w3.org/2000/svg"><path d="M15 5 H35 Q40 5 40 10 V15 H10 V10 Q10 5 15 5 Z" fill="silver" stroke="#333" stroke-width="1.5"/><rect x="10" y="15" width="30" height="85" rx="5" fill="${fillColor}" stroke="#333" stroke-width="2"/><text x="25" y="60" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">${label.substring(
    0,
    4,
  )}</text></svg>`;

/**
 * Generates an SVG string for a coin.
 * @param {string} fillColor - The fill color for the coin.
 * @param {string} text - The text to display on the coin.
 * @param {string} [size="30"] - The size of the coin SVG.
 * @returns {string} SVG markup for the coin.
 */
export const createCoin = (fillColor, text, size = '30') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="${fillColor}" stroke="#555" stroke-width="1.5"/><text x="50%" y="52.5%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="#2D3748" font-family="Arial, sans-serif">${text}</text></svg>`;
