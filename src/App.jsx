import { useVendingMachine } from './hooks/useVendingMachine';
import {
  ProductGrid,
  CoinSection,
  PurchaseControls,
  DispenseSlot,
  DisplayPanel,
  Footer,
  ChangeReturn,
  MachineStatePanel,
} from './components';

/**
 * Main application component for the vending machine UI
 *
 * Integrates all major UI panels and controls, including:
 * - DisplayPanel: Shows messages and balance.
 * - ProductGrid: Displays available items for selection.
 * - CoinSection: Allows users to insert coins.
 * - PurchaseControls: Handles purchase and cancel actions.
 * - DispenseSlot: Shows dispensed items.
 * - ChangeReturn: Displays returned change.
 * - MachineStatePanel: Shows internal machine state (for debugging/admin).
 * - Footer: Application footer.
 *
 * State and handlers are provided by the `useVendingMachine` hook.
 *
 * @component
 * @returns {JSX.Element} The rendered vending machine application.
 */
function App() {
  const {
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
    formatBalance,
    ORDERED_COIN_TYPES,
    COIN_CONFIG,
  } = useVendingMachine();

  const canPurchase =
    !!selectedId &&
    items[selectedId]?.price <= balance &&
    items[selectedId]?.stock > 0;

  const textColorClass =
    msgType === 'error'
      ? 'text-red-300'
      : msgType === 'success'
        ? 'text-green-300'
        : 'text-white';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="vending-machine-bg w-full max-w-2xl lg:max-w-4xl rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6">
        <DisplayPanel
          msg={msg}
          textColorClass={textColorClass}
          formatBalance={formatBalance}
          balance={balance}
        />

        <ProductGrid
          items={items}
          selectedId={selectedId}
          handleSelect={handleSelect}
        />
        <CoinSection
          ORDERED_COIN_TYPES={ORDERED_COIN_TYPES}
          handleCoin={handleCoin}
        />
        <PurchaseControls
          canPurchase={canPurchase}
          handlePurchase={handlePurchase}
          handleCancel={handleCancel}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <DispenseSlot dispensed={dispensed} />
          <ChangeReturn
            change={change}
            ORDERED_COIN_TYPES={ORDERED_COIN_TYPES}
            COIN_CONFIG={COIN_CONFIG}
            balance={balance}
            selectedId={selectedId}
          />
        </div>

        <MachineStatePanel
          showState={showState}
          setShowState={setShowState}
          coins={coins}
          items={items}
          deposit={deposit}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
