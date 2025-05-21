import ProductButton from './ProductButton';

/**
 * Renders a grid of product buttons for selection.
 *
 * @component
 * @param {Object} props
 * @param {Object.<string, { stock: number, [key: string]: any }>} props.items - An object mapping product IDs to product data.
 * @param {string} props.selectedId - The ID of the currently selected product.
 * @param {function(string): void} props.handleSelect - Callback invoked when a product is selected, receives the product ID.
 */
function ProductGrid({ items, selectedId, handleSelect }) {
  return (
    <div className="product-grid">
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
  );
}

export default ProductGrid;
