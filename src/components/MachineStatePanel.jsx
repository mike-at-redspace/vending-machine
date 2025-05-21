/**
 * Displays a panel showing the current state of the vending machine, including machine coins
 * product inventory, and user deposited coins. Allows toggling the visibility of the state panel
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.showState - Whether the machine state panel is visible
 * @param {function} props.setShowState - Function to toggle the visibility of the state panel
 * @param {Object} props.coins - Object representing the machine's coin inventory
 * @param {Object} props.items - Object representing the product inventory, keyed by product ID
 * @param {Object} props.deposit - Object representing the coins deposited by the user
 * @returns {JSX.Element} The rendered MachineStatePanel component
 */
function MachineStatePanel({ showState, setShowState, coins, items, deposit }) {
  return (
    <div className='mt-6'>
      <button
        onClick={() => setShowState(prev => !prev)}
        className='w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none'
      >
        {showState ? 'Hide' : 'Show'} Machine State
      </button>
      {showState && (
        <div className='bg-gray-800 text-gray-200 p-4 mt-2 rounded-lg shadow-inner text-xs sm:text-sm space-y-3'>
          <div>
            <h4 className='font-semibold text-gray-400'>Machine Coins:</h4>
            <pre>{JSON.stringify(coins, null, 2)}</pre>
          </div>
          <div>
            <h4 className='font-semibold text-gray-400'>Product Inventory:</h4>
            <pre>
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(items).map(([key, val]) => [
                    key,
                    {
                      name: val.name,
                      stock: val.stock,
                      price: val.price
                    }
                  ])
                ),
                null,
                2
              )}
            </pre>
          </div>
          <div>
            <h4 className='font-semibold text-gray-400'>
              User Deposited Coins:
            </h4>
            <pre>{JSON.stringify(deposit, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default MachineStatePanel
