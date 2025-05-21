import OutputSlot from './OutputSlot';
import { ORDERED_COIN_TYPES, COIN_CONFIG } from '../CONSTANTS';
import { createCoin } from '../utils/svgUtils';

/**
 * ChangeReturn component for displaying returned change coins.
 * @param {object} props
 * @param {object} props.change - The change object mapping coin types to counts.
 * @param {number} props.balance - Current balance.
 * @param {string|null} props.selectedId - Currently selected product id.
 */
function ChangeReturn({ change, balance, selectedId }) {
  return (
    <OutputSlot label="Change Return">
      {change && ORDERED_COIN_TYPES.some((type) => change[type] > 0) ? (
        ORDERED_COIN_TYPES.map((coinType) =>
          Array(change[coinType] || 0)
            .fill(0)
            .map((_, i) => {
              const coinConfig = COIN_CONFIG[coinType];
              return (
                <div
                  key={`${coinType}-${i}`}
                  className="change-coin-item"
                  title={`${coinType} (${coinConfig.label})`}
                  dangerouslySetInnerHTML={{
                    __html: createCoin(
                      coinConfig.svgColor,
                      coinConfig.label,
                      coinConfig.displaySize,
                    ),
                  }}
                />
              );
            }),
        )
      ) : balance > 0 && !selectedId ? (
        <p className="text-gray-400 text-sm">Awaiting transaction...</p>
      ) : (
        <p className="text-gray-400 text-sm">Empty</p>
      )}
    </OutputSlot>
  );
}

export default ChangeReturn;
