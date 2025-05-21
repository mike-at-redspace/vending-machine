function PurchaseControls({ canPurchase, handlePurchase, handleCancel }) {
  return (
    <div className="purchase-controls">
      <button
        onClick={handlePurchase}
        disabled={!canPurchase}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-green-800"
      >
        PURCHASE
      </button>
      <button
        onClick={handleCancel}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 text-base sm:text-lg"
      >
        CANCEL
      </button>
    </div>
  );
}

export default PurchaseControls;
