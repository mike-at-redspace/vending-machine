import { useVendingMachine } from './hooks/useVendingMachine'
import {
  ProductGrid,
  CoinSection,
  PurchaseControls,
  DispenseSlot,
  DisplayPanel,
  Footer,
  ChangeReturn,
  MachineStatePanel
} from './components'

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
    dispensed,
    change,
    showState,
    setShowState,
    canPurchase,
    textColorClass,
    handleCoin,
    handleSelect,
    handleCancel,
    handlePurchase
  } = useVendingMachine()

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white'>
      <div className='vending-machine-bg w-full max-w-2xl lg:max-w-4xl rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6'>
        <DisplayPanel
          msg={msg}
          textColorClass={textColorClass}
          balance={balance}
        />
        <ProductGrid
          items={items}
          selectedId={selectedId}
          handleSelect={handleSelect}
        />
        <CoinSection handleCoin={handleCoin} />
        <PurchaseControls
          canPurchase={canPurchase}
          handlePurchase={handlePurchase}
          handleCancel={handleCancel}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          <DispenseSlot dispensed={dispensed} />
          <ChangeReturn
            change={change}
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
  )
}

export default App
