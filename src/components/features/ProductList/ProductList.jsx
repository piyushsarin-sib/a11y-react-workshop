import PropTypes from "prop-types";
import Button from "@common/Button";
import Collection from "@lib/Collections/Collection";
import { useRovingIndex } from "@lib/interactions/keyboard/hooks/useRovingTabIndex";

const ProductList = ({ products, onAddToCart }) => {
  // 2D Grid keyboard navigation for product grid (4 columns on desktop, 2 on mobile)
  const gridNav = useRovingIndex({
    items: products,
    orientation: "both",
    columnsCount: 4, // Based on  class
    defaultActiveKey: products.length > 0 ? products[0].id : null,
  });

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
      <div className="sr-only" aria-live="polite">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </div>
      {/* COLLECTIONS START */}
      <Collection
        as="ul"
        itemAs="li"
        className="grid grid-cols-2  gap-4"
        pattern="grid"
        ariaLabel="Product cards"
        {...gridNav.getCollectionProps()}
      >
        {products.map((product) => (
          <Collection.Item
            key={product.id}
            className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
            {...gridNav.getItemProps(product.id)}
          >
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-32 object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
            <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
            <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
            <Button
              onClick={() => onAddToCart(product)}
              className="w-full px-3 py-1.5 text-sm"
              ariaLabel={`Add ${product.name} to cart`}
              variant="primary"
            >
              Add to Cart
            </Button>
          </Collection.Item>
        ))}
      </Collection>
      {/* COLLECTIONS END */}
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