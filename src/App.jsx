import { useState } from 'react';
import { createCoin } from './utils/svgUtils';
import { formatBalance } from './utils/formatUtils';
import { ProductButton } from './components/ProductButton';
import { CoinButton } from './components/CoinButton';
import { OutputSlot } from './components/OutputSlot';
import {
  INITIAL_PRODUCTS,
  COIN_CONFIG,
  ORDERED_COIN_TYPES,
  COIN_VALUES,
  INITIAL_DEPOSITED_COINS,
} from './CONSTANTS';

/**
 * Main Vending Machine App component.
 * Handles state and logic for vending machine simulation.
 * @component
 */
function App() {
  const [coins, setCoins] = useState({
    QUARTER: 5,
    DIME: 5,
    NICKEL: 5,
  });
  const [items, setItems] = useState(
    JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
  );
  const [deposit, setDeposit] = useState({
    ...INITIAL_DEPOSITED_COINS,
  });
  const [balance, setBalance] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [msg, setMsg] = useState('Welcome!\nInsert coins or select a product.');
  const [msgType, setMsgType] = useState('info'); // 'info', 'success', 'error'
  const [dispensed, setDispensed] = useState(null);
  const [change, setChange] = useState(null);
  const [showState, setShowState] = useState(false);

  const displayMsg = (text, type = 'info', duration = null) => {
    setMsg(text);
    setMsgType(type);
    if (duration) {
      setTimeout(() => {
        setMsg((prev) =>
          text === prev
            ? 'Thank you!\nSelect another item or insert coins'
            : prev,
        );
        setMsgType('info');
        clearSlots();
      }, duration);
    }
  };

  const clearSlots = () => {
    setDispensed(null);
    setChange(null);
  };

  const resetTxn = (clearMessage = false) => {
    setBalance(0);
    setDeposit({ ...INITIAL_DEPOSITED_COINS });
    setSelectedId(null);
    if (clearMessage) {
      displayMsg('Transaction reset.\nPlease start over.');
    }
  };

  function handleCoin(coinType) {
    const audio = new Audio('./src/assets/mp3/coin-drop.mp3');
    audio.play();

    setDeposit((prev) => ({
      ...prev,
      [coinType]: prev[coinType] + 1,
    }));

    setBalance((prev) => prev + COIN_VALUES[coinType]);
    displayMsg(
      `Deposited ${coinType.toLowerCase()} (${COIN_VALUES[coinType]}¢).`,
      'success',
    );
    clearSlots();
  }

  function handleSelect(id) {
    const item = items[id];
    if (item.stock <= 0) {
      displayMsg(
        `${item.name} is out of stock. Please select another item.`,
        'error',
      );
      setSelectedId(null);
      return;
    }

    const audio = new Audio('./src/assets/mp3/beep.mp3');
    audio.play();

    setSelectedId(id);
    displayMsg(
      `${item.name} selected (${item.price}¢).\nPress Purchase or Cancel.`,
      'info',
    );
    clearSlots();
  }

  function handleCancel() {
    if (balance === 0 && !selectedId) {
      displayMsg('Nothing to cancel\nInsert coins or select an item', 'error');
      return;
    }
    const returnedAmount = balance;
    let message = 'Transaction cancelled.';
    if (returnedAmount > 0) {
      message += `\n${formatBalance(returnedAmount)} returned`;
    }
    message += '\nPlease start over';

    displayMsg(message, 'error');
    resetTxn();
    clearSlots();
  }

  function handlePurchase() {
    if (!selectedId) {
      displayMsg('Please select an item first', 'error');
      return;
    }
    const item = items[selectedId];

    if (item.stock <= 0) {
      displayMsg(
        `${item.name} is out of stock, Transaction cancelled!`,
        'error',
      );
      resetTxn();
      clearSlots();
      return;
    }
    if (balance < item.price) {
      displayMsg(
        `Insufficient funds for ${item.name}\nNeed ${
          item.price - balance
        }¢ more`,
        'error',
      );
      return;
    }

    let changeToMake = balance - item.price;
    const coinsToGive = { ...INITIAL_DEPOSITED_COINS };
    const tempCoins = { ...coins };

    if (changeToMake > 0) {
      for (const coinType of ORDERED_COIN_TYPES) {
        const value = COIN_VALUES[coinType];
        const available = tempCoins[coinType];
        const needed = Math.floor(changeToMake / value);
        const toUse = Math.min(needed, available);

        if (toUse > 0) {
          coinsToGive[coinType] += toUse;
          tempCoins[coinType] -= toUse;
          changeToMake -= toUse * value;
        }
      }
    }

    if (changeToMake > 0) {
      displayMsg(
        `Machine cannot make exact change for ${
          balance - item.price
        }¢\nTransaction cancelled\nYour ${formatBalance(balance)} is returned`,
        'error',
      );
      resetTxn();
      clearSlots();
      return;
    }

    const audio = new Audio('./src/assets/mp3/purchase.mp3');
    audio.play();

    setItems((prev) => ({
      ...prev,
      [selectedId]: {
        ...prev[selectedId],
        stock: prev[selectedId].stock - 1,
      },
    }));

    setCoins((cur) => {
      const newCoins = { ...cur };
      for (const coinType in deposit) {
        newCoins[coinType] += deposit[coinType];
      }
      for (const coinType in coinsToGive) {
        newCoins[coinType] -= coinsToGive[coinType];
      }
      return newCoins;
    });

    const dispChange = balance - item.price;
    let changeMsgParts = [];
    if (dispChange > 0) {
      ORDERED_COIN_TYPES.forEach((coin) => {
        if (coinsToGive[coin] > 0) {
          changeMsgParts.push(
            `${coinsToGive[coin]} × ${coin.toLowerCase()}(s)`,
          );
        }
      });
    }

    displayMsg(
      `${item.name} dispensed!\nChange: ${formatBalance(dispChange)}`,
      'success',
      5000,
    );
    setDispensed({
      name: item.name,
      svg: item.svg,
      color: item.color,
    });
    if (dispChange > 0) {
      setChange(coinsToGive);
    }

    resetTxn();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="vending-machine-bg w-full max-w-2xl lg:max-w-4xl rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6">
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-inner text-center">
          <pre
            className={`text-lg sm:text-xl font-medium min-h-[3em] flex items-center justify-center whitespace-pre-wrap ${
              msgType === 'error'
                ? 'text-red-300'
                : msgType === 'success'
                  ? 'text-green-300'
                  : 'text-white'
            }`}
          >
            {msg}
          </pre>
          <p className="text-2xl sm:text-3xl font-bold mt-1">
            Balance: {formatBalance(balance)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(items).map(([id, item]) => (
            <ProductButton
              key={id}
              productId={id}
              product={item}
              selected={selectedId === id}
              onClick={() => handleSelect(id)}
              disabled={item.stock <= 0}
            />
          ))}
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow">
          <h3 className="text-center text-gray-700 font-semibold mb-3 text-lg">
            Insert Coins
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {ORDERED_COIN_TYPES.map((coinType) => (
              <CoinButton
                key={coinType}
                coinType={coinType}
                onClick={() => handleCoin(coinType)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={handlePurchase}
            disabled={
              !selectedId ||
              items[selectedId]?.price > balance ||
              items[selectedId]?.stock === 0
            }
            className="btn-action bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 text-base sm:text-lg
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-green-800"
          >
            PURCHASE
          </button>
          <button
            onClick={handleCancel}
            className="btn-action bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 text-base sm:text-lg"
          >
            CANCEL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <OutputSlot label="Dispense Slot">
            {dispensed ? (
              <div
                className={`p-2 rounded ${dispensed.color} dispense-slot-item flex flex-col items-center`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: dispensed.svg
                      .replace(
                        'width="60" height="100"',
                        'width="40" height="70"',
                      ) // For Cans
                      .replace(
                        'width="50" height="110"',
                        'width="35" height="77"',
                      ), // For Bottles
                  }}
                />
                <p className="text-xs text-white mt-1">{dispensed.name}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Empty</p>
            )}
          </OutputSlot>

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
            ) : balance > 0 && !selectedId ? ( // Money inserted, but no action yet
              <p className="text-gray-400 text-sm">Awaiting transaction...</p>
            ) : (
              <p className="text-gray-400 text-sm">Empty</p>
            )}
          </OutputSlot>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowState((prev) => !prev)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none"
          >
            {showState ? 'Hide' : 'Show'} Machine State
          </button>
          {showState && (
            <div className="bg-gray-800 text-gray-200 p-4 mt-2 rounded-lg shadow-inner text-xs sm:text-sm space-y-3">
              <div>
                <h4 className="font-semibold text-gray-400">Machine Coins:</h4>
                <pre>{JSON.stringify(coins, null, 2)}</pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-400">
                  Product Inventory:
                </h4>
                <pre>
                  {JSON.stringify(
                    Object.fromEntries(
                      Object.entries(items).map(([key, val]) => [
                        key,
                        {
                          name: val.name,
                          stock: val.stock,
                          price: val.price,
                        },
                      ]),
                    ),
                    null,
                    2,
                  )}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-400">
                  User Deposited Coins:
                </h4>
                <pre>{JSON.stringify(deposit, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="text-center text-gray-600 mt-8 text-sm">
        Vending Machine Simulator using React and TailwindCSS | {` `}
        <a
          href="https://github.com/mike-at-redspace"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800"
        >
          mike-at-redspace
        </a>
      </footer>
    </div>
  );
}

export default App;
