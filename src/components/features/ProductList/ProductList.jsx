import { useId } from "react";
import PropTypes from "prop-types";
import Button from "@common/Button";
import { Item } from "@lib/Collections";
import { useCollectionState } from "@lib/Collections";

/**
 * ProductList - Demonstrates the new Collection/Item system
 *
 * This component showcases how to use the modern Collection approach:
 * 1. Use <Item> components as children (not items array)
 * 2. useCollectionState processes the Items into a collection
 * 3. Render the collection directly (no keyboard nav/selection needed for product grid)
 */
const ProductList = ({ products, onAddToCart, getButtonRef }) => {
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

      {/* Using new Collection system - JSX children instead of items array */}
      <ProductGrid
        products={products}
        onAddToCart={onAddToCart}
        baseId={baseId}
        getButtonRef={getButtonRef}
      />
    </>
  );
};

/**
 * ProductGrid - Internal component that uses the new Collection system
 */
const ProductGrid = ({ products, onAddToCart, baseId, getButtonRef }) => {
  // Build collection from JSX children using the new system
  const state = useCollectionState({
    children: products.map((product) => {
      const titleId = `${baseId}-title-${product.id}`;
      const descId = `${baseId}-desc-${product.id}`;
      const priceId = `${baseId}-price-${product.id}`;

      return (
        <Item
          key={product.id}
          aria-labelledby={titleId}
          aria-describedby={`${descId} ${priceId}`}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            titleId={titleId}
            descId={descId}
            priceId={priceId}
            buttonRef={getButtonRef?.(product.id)}
          />
        </Item>
      );
    }),
    // No pattern - just use semantic HTML (section + article)
    // pattern is only needed for interactive collections (menu, tree, listbox, etc.)
    ariaLabel: "Product cards",
  });

  // Get ARIA props for the container (just aria-label, no role)
  const collectionProps = state.getCollectionProps();

  return (
    <section
      {...collectionProps}
      className="grid grid-cols-2 gap-4"
    >
      {state.collection.map((node) => (
        <article
          key={node.key}
          aria-labelledby={node.props["aria-labelledby"]}
          aria-describedby={node.props["aria-describedby"]}
          className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
        >
          {node.rendered}
        </article>
      ))}
    </section>
  );
};

/**
 * ProductCard - Renders individual product content
 */
const ProductCard = ({ product, priceId, onAddToCart, titleId, descId, buttonRef }) => {
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
      <p id={priceId} className="block font-bold mb-2 text-blue-700">{product.price}</p>
      <Button
        ref={buttonRef}
        onClick={() => onAddToCart(product)}
        className="w-full px-3 py-1.5 text-sm"
        variant="primary"
      >
        Add to Cart
      </Button>
    </>
  );
};

// PropTypes
const productShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
});

ProductList.propTypes = {
  products: PropTypes.arrayOf(productShape).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  getButtonRef: PropTypes.func,
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(productShape).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  baseId: PropTypes.string.isRequired,
  getButtonRef: PropTypes.func,
};

ProductCard.propTypes = {
  product: productShape.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  titleId: PropTypes.string.isRequired,
  descId: PropTypes.string.isRequired,
  priceId: PropTypes.string.isRequired,
  buttonRef: PropTypes.func,
};

export default ProductList;
