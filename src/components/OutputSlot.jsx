/**
 * Output slot for dispensed items or change.
 * @param {Object} props
 * @param {string} props.label - Label for the slot.
 * @param {React.ReactNode} props.children - Slot contents.
 * @returns {JSX.Element}
 */
function OutputSlot({ label, children }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner min-h-[150px] flex flex-col items-center justify-center">
      <h4 className="text-gray-300 font-semibold mb-2">{label}</h4>
      <div className="flex flex-wrap gap-2 justify-center items-end min-h-[120px]">
        {children}
      </div>
    </div>
  );
}

export default OutputSlot;
