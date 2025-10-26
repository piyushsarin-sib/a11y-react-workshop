/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import AccessibilityBanner from "@components/features/AccessibilityBanner";
import Layout from "./Layout";
import { products } from "./productsData";
import SearchAndFilter from "./SearchAndFilter";
import CheckoutModal from "./CheckoutModal";
import AddToCartModal from "./AddToCartModal";
import CartModal from "./CartModal";

const ECommContainer = ({ cartContext }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ categories: ["all"], prices: ["all"] });
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  // Extract cart context values
  const {
    cart = [],
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    isCartModalOpen = false,
    closeCartModal,
    isCheckoutModalOpen = false,
    openCheckoutModal,
    closeCheckoutModal,
    handleCheckout,
    orderPlaced = false,
    isProcessing = false,
  } = cartContext || {};

  // Debug logging
  console.log("ECommContainer cartContext:", cartContext);
  console.log("ECommContainer cart:", cart);
  console.log("ECommContainer addToCart:", addToCart);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsAddToCartModalOpen(false);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  // Handle search input changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter products based on search and filters
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter - handle array format
      const categories = filters.categories || [];
      const matchesCategory =
        categories.includes("all") || categories.length === 0 || categories.includes(product.category);

      // Price filter - handle array format
      const prices = filters.prices || [];
      let matchesPrice = true;
      if (prices.length > 0 && !prices.includes("all")) {
        matchesPrice = prices.some((priceRange) => {
          switch (priceRange) {
            case "under1000":
              return product.priceValue < 1000;
            case "1000-5000":
              return product.priceValue >= 1000 && product.priceValue <= 5000;
            case "above5000":
              return product.priceValue > 5000;
            default:
              return true;
          }
        });
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, filters]);

  return (
    <>
      <main className="container mx-auto px-4" aria-labelledby="products-heading">
        {/* Accessibility Banner */}
        <AccessibilityBanner />

        <h2 className="text-2xl font-bold mb-4">Accessible Products</h2>
        <p className="mb-6">
          Explore our accessible products designed for everyone, including people with disabilities.
        </p>

        {/* Search and Filter Component */}
        <SearchAndFilter onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No products match your search criteria.</p>
            <p className="mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Results count for screen readers */}
        <div className="grid grid-cols-2  gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-32 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
              <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">
                {product.description}
              </p>
              <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
              <button
                onClick={() => handleOpenModal(product)}
                className="bg-blue-600 text-white w-full px-3 py-1.5 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={'Add'}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <AddToCartModal
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onClose={handleCloseModal}
        isOpen={isAddToCartModalOpen}
        cart={cart}
        openCartModal={cartContext?.openCartModal}
      />
      <CartModal
        cart={cart}
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
        onCheckout={openCheckoutModal}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={closeCheckoutModal}
        orderPlaced={orderPlaced}
        onCheckout={handleCheckout}
        isProcessing={isProcessing}
      />
    </>
  );
};

ECommContainer.propTypes = {
  cartContext: PropTypes.shape({
    cart: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartItemQuantity: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    isCartModalOpen: PropTypes.bool.isRequired,
    openCartModal: PropTypes.func.isRequired,
    closeCartModal: PropTypes.func.isRequired,
    isCheckoutModalOpen: PropTypes.bool.isRequired,
    openCheckoutModal: PropTypes.func.isRequired,
    closeCheckoutModal: PropTypes.func.isRequired,
    handleCheckout: PropTypes.func.isRequired,
    orderPlaced: PropTypes.bool.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    clearCart: PropTypes.func.isRequired,
  }),
};

const ECommIssues = () => {
  return (
    <Layout>
      <ECommContainer />
    </Layout>
  );
};

export default ECommIssues;
