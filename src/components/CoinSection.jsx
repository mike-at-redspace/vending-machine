import CoinButton from './CoinButton'
import { ORDERED_COIN_TYPES } from '../CONSTANTS'

/**
 * Renders a section for inserting coins, displaying a button for each coin type.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.handleCoin - Callback function invoked when a coin button is clicked, receives the coin type as an argument.
 * @returns {JSX.Element} The rendered CoinSection component.
 */
function CoinSection({ handleCoin }) {
  return (
    <div className='coin-section'>
      <h3 className='coin-section-title'>Insert Coins</h3>
      <div className='coin-section-grid'>
        {ORDERED_COIN_TYPES.map(coinType => (
          <CoinButton
            key={coinType}
            coinType={coinType}
            onClick={() => handleCoin(coinType)}
          />
        ))}
      </div>
    </div>
  )
}

export default CoinSection
