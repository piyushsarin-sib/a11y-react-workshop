import { useId } from "react";
import PropTypes from "prop-types";
import Button from "@common/Button";
import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingTabIndex";

const ProductList = ({ products, onAddToCart }) => {
  const baseId = useId();
  
  // 2D Grid keyboard navigation for product grid
  const gridNav = useRovingIndex({
    items: products,
    orientation: "both",
    columnsCount: 2,
    defaultActiveKey: products.length > 0 ? products[0].id : null,
  });

  const focusedItemId = gridNav.activeKey;

  if (products.length === 0) {
    return (
      <div className="text-center py-8" aria-live="polite">
        <p className="text-lg text-gray-700">No products match your search criteria.</p>
        <p className="mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      {/* Results count for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </div>
      
      {/* Grid using enhanced Collection component */}
      <Collection
        as="div"
        className="grid grid-cols-2 gap-4"
        pattern="grid"
        ariaLabel="Product cards"
        colCount={1}
        getTitleId={(key) => `${baseId}-title-${key}`}
        getDescriptionId={(key) => `${baseId}-desc-${key}`}
        {...gridNav.getCollectionProps()}
      >
        {products.map((product, index) => {
          const isFocused = focusedItemId === product.id;
          const titleId = `${baseId}-title-${product.id}`;
          const descId = `${baseId}-desc-${product.id}`;

          return (
            <Collection.Item
              key={product.id}
              as="article"
              rowIndex={index + 1}
              titleId={titleId}
              descriptionId={descId}
              tabIndex={isFocused ? 0 : -1}
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...gridNav.getItemProps(product.id)}
            >
              <img
                src={product.image}
                alt={product.alt}
                aria-label={product.alt}
                className="w-full h-32 object-cover mb-3 rounded"
              />
              <h3 id={titleId} className="text-lg font-semibold line-clamp-1">
                {product.name}
              </h3>
              <p id={descId} className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">
                {product.description}
              </p>
              <span className="block font-bold mb-2 text-blue-700">
                {product.price}
              </span>
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full px-3 py-1.5 text-sm"
                aria-label={`Add ${product.name} to cart`}
                variant="primary"
                tabIndex={isFocused ? undefined : -1}
              >
                Add to Cart
              </Button>
            </Collection.Item>
          );
        })}
      </Collection>
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;