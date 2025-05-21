/**
 * Formats a balance in cents as a USD currency string.
 * @param {number} balanceInCents
 * @returns {string}
 */
function formatBalance(balanceInCents) {
  if (balanceInCents === 0) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balanceInCents / 100);
}

export default formatBalance;
