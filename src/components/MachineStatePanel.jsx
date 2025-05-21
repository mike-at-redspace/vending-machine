function MachineStatePanel({ showState, setShowState, coins, items, deposit }) {
  return (
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
            <h4 className="font-semibold text-gray-400">Product Inventory:</h4>
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
  );
}

export default MachineStatePanel;
