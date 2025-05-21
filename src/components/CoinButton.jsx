import React from 'react';
import { COIN_CONFIG } from '../CONSTANTS';
import { createCoin } from '../utils/svgUtils';

/**
 * Coin insertion button for the vending machine.
 * @param {Object} props
 * @param {string} props.coinType - The type of coin (e.g., 'NICKEL').
 * @param {Function} props.onClick - Click handler.
 * @returns {JSX.Element}
 */
function CoinButton({ coinType, onClick }) {
  const config = COIN_CONFIG[coinType];
  const { btnBg, btnHoverBg, btnTextColor, btnFocusRing, svgColor, label, id } =
    config;
  const coinIconSize = '24';

  return (
    <button
      onClick={onClick}
      className={`btn-coin text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 flex items-center justify-center space-x-2
              ${btnBg} ${btnHoverBg} ${btnTextColor} ${btnFocusRing}
            `}
    >
      <span
        className="hidden sm:inline"
        dangerouslySetInnerHTML={{
          __html: createCoin(svgColor, label, coinIconSize),
        }}
      />
      <span>
        {id} ({label})
      </span>
    </button>
  );
}

export default CoinButton;
