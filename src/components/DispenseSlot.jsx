import React from 'react';
import OutputSlot from './OutputSlot';

/**
 * DispenseSlot component for displaying dispensed item.
 * @param {object} props
 * @param {object|null} props.dispensed - The dispensed item object or null.
 */
export function DispenseSlot({ dispensed }) {
  return (
    <OutputSlot label="Dispense Slot">
      {dispensed ? (
        <div
          className={`p-2 rounded ${dispensed.color} dispense-slot-item flex flex-col items-center`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: dispensed.svg
                .replace('width="60" height="100"', 'width="40" height="70"') // For Cans
                .replace('width="50" height="110"', 'width="35" height="77"'), // For Bottles
            }}
          />
          <p className="text-xs text-white mt-1">{dispensed.name}</p>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Empty</p>
      )}
    </OutputSlot>
  );
}

export default DispenseSlot;
