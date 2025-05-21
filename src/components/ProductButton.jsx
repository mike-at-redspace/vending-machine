/**
 * Product selection button for the vending machine
 *
 * @param {Object} props
 * @param {Object} props.product - Product data
 * @param {boolean} props.selected - Whether this product is selected
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether the button is disabled
 * @returns {JSX.Element}
 */
function ProductButton({ product, selected, onClick, disabled }) {
  const { color, textColor, svg, name, price, stock } = product
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`product-card p-3 sm:p-4 rounded-lg shadow-lg text-center space-y-2
              ${color} ${textColor}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
              ${
                selected
                  ? 'ring-4 ring-offset-2 ring-green-400 product-card-selected'
                  : ''
              }
            `}
    >
      <div
        className='flex justify-center items-center h-24 sm:h-32'
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className='font-semibold text-sm sm:text-md'>{name}</p>
      <p className='text-xs sm:text-sm'>{price}¢</p>
      <p
        className={`text-xs sm:text-sm font-medium ${
          disabled ? 'text-red-900 dark:text-red-300' : 'text-inherit'
        }`}
      >
        <b>{stock > 0 ? `Stock: ${stock}` : 'OUT OF STOCK'}</b>
      </p>
    </button>
  )
}

export default ProductButton
