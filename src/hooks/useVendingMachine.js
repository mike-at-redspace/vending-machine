import { useState } from 'react';
import formatBalance from '../utils/formatBalance';
import {
  INITIAL_PRODUCTS,
  COIN_CONFIG,
  ORDERED_COIN_TYPES,
  COIN_VALUES,
  INITIAL_DEPOSITED_COINS,
  INITIAL_MACHINE_COINS,
} from '../CONSTANTS';
import { useAudio } from './useAudio';

/**
 * Custom React hook to manage the state and logic of a vending machine.
 *
 * Handles coin deposits, item selection, purchases, cancellations, and change dispensing.
 * Manages audio feedback, user messages, and updates to the vending machine's inventory and coin reserves.
 *
 * @returns {Object} Vending machine state and handler functions:
 * @returns {Object} coins - Current coin reserves in the machine.
 * @returns {Object} items - Current inventory of products.
 * @returns {Object} deposit - Coins deposited by the user for the current transaction.
 * @returns {number} balance - Total value of coins deposited by the user (in cents).
 * @returns {string|null} selectedId - ID of the currently selected product, or null if none.
 * @returns {string} msg - Current message to display to the user.
 * @returns {string} msgType - Type of the current message ('info', 'success', 'error').
 * @returns {Object|null} dispensed - Information about the last dispensed item, or null.
 * @returns {Object|null} change - Coins to be returned as change, or null.
 * @returns {boolean} showState - Whether to show the internal state for debugging.
 * @returns {Function} setShowState - Setter for showState.
 * @returns {Function} handleCoin - Handler for depositing a coin. Accepts a coin type string.
 * @returns {Function} handleSelect - Handler for selecting an item. Accepts an item ID.
 * @returns {Function} handleCancel - Handler for cancelling the current transaction.
 * @returns {Function} handlePurchase - Handler for purchasing the selected item.
 * @returns {Object} COIN_CONFIG - Configuration for available coin types.
 * @returns {Array<string>} ORDERED_COIN_TYPES - Coin types ordered by value (descending).
 * @returns {Function} formatBalance - Formats a balance (in cents) as a string.
 */
export function useVendingMachine() {
  const [coins, setCoins] = useState(INITIAL_MACHINE_COINS);
  const [items, setItems] = useState(INITIAL_PRODUCTS);
  const [deposit, setDeposit] = useState(INITIAL_DEPOSITED_COINS);
  const [balance, setBalance] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [msg, setMsg] = useState('Welcome!\nInsert coins or select a product.');
  const [msgType, setMsgType] = useState('info');
  const [dispensed, setDispensed] = useState(null);
  const [change, setChange] = useState(null);
  const [showState, setShowState] = useState(false);

  const playCoin = useAudio('./src/assets/mp3/coin-drop.mp3');
  const playBeep = useAudio('./src/assets/mp3/beep.mp3');
  const playPurchase = useAudio('./src/assets/mp3/purchase.mp3');

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
    playCoin();
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
    playBeep();
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

    playPurchase();

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

  return {
    coins,
    items,
    deposit,
    balance,
    selectedId,
    msg,
    msgType,
    dispensed,
    change,
    showState,
    setShowState,
    handleCoin,
    handleSelect,
    handleCancel,
    handlePurchase,
    COIN_CONFIG,
    ORDERED_COIN_TYPES,
    formatBalance,
  };
}
