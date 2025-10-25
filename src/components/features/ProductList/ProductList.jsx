import { useId } from "react";
import PropTypes from "prop-types";
import Button from "@common/Button";
import Collection from "@lib/Collections/classic/Collection";

const ProductList = ({ products, onAddToCart }) => {
  const baseId = useId();

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

      {/* Grid using enhanced Collection component with dual navigation */}
      <Collection
        as="div"
        items={products}
        itemAs="article"
        className="grid grid-cols-2 gap-4"
        pattern="grid"
        ariaLabel="Product cards"
        colCount={2}
        getTitleId={(key) => `${baseId}-title-${key}`}
        getDescriptionId={(key) => `${baseId}-desc-${key}`}
        enableArrowNavigation={true}
        getItemProps={() => ({
          className:
            "border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500",
        })}
      >
        {(product) => {
          const titleId = `${baseId}-title-${product.id}`;
          const descId = `${baseId}-desc-${product.id}`;

          return (
            <>
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
              <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full px-3 py-1.5 text-sm"
                aria-label={`Add ${product.name} to cart`}
                variant="primary"
              >
                Add to Cart
              </Button>
            </>
          );
        }}
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
