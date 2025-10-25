/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AccessibilityBanner from "@components/features/AccessibilityBanner";
import Layout from "./Layout";
import Button from "@common/Button";
import QuantitySelector from "@common/QuantitySelector";

// Add category property to each product
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Comfortable over-ear headphones with noise cancellation.",
    image: "/headphone.jpeg",
    alt: "Black wireless over-ear headphones",
    price: "Rs 500",
    category: "hearing",
    priceValue: 500,
  },
  {
    id: 2,
    name: "Braille Keyboard",
    description: "Keyboard with Braille for visually impaired users.",
    image: "/brailkeyboard.jpeg",
    alt: "Braille keyboard with raised dots on keys",
    price: "Rs 45000",
    category: "vision",
    priceValue: 45000,
  },
  {
    id: 3,
    name: "Wheelchair",
    description: "Lightweight, foldable wheelchair for easy mobility.",
    image: "/wheelchair.jpeg",
    alt: "Lightweight foldable wheelchair",
    price: "Rs 2500",
    category: "mobility",
    priceValue: 2500,
  },
  {
    id: 4,
    name: "Smart Cane (Obstacle Detector)",
    description: "Uses sensors to detect obstacles and provides alerts via vibrations.",
    image: "/ObstacleDetector.jpeg",
    alt: "Smart cane with obstacle detection sensors",
    price: "Rs 3000",
    category: "vision",
    priceValue: 3000,
  },
  {
    id: 5,
    name: "Behind-The-Ear (BTE) Digital Hearing Aid",
    description: "An entry-level hearing aid that is powerful and durable.",
    image: "/behind_the_ear.jpeg",
    alt: "Behind-the-ear digital hearing aid",
    price: "Rs 8000",
    category: "hearing",
    priceValue: 8000,
  },
  {
    id: 6,
    name: "Sensory Toy Kit for Autism/ADHD",
    description: "A kit of sensory toys designed for children with Autism or ADHD.",
    image: "/SensoryToyKitforAutism.jpeg",
    alt: "Sensory toy kit for Autism and ADHD",
    price: "Rs 1500",
    category: "sensory",
    priceValue: 1500,
  },
  {
    id: 7,
    name: "Vibrating Alarm Clock",
    description:
      "An alarm clock designed for deaf or hard-of-hearing individuals that uses vibrations to wake them up.",
    image: "/alarmClock.jpeg",
    alt: "Vibrating alarm clock for deaf or hard-of-hearing",
    price: "Rs 2000",
    category: "hearing",
    priceValue: 2000,
  },
  {
    id: 8,
    name: "Orthopedic Shoes (Diabetic-friendly)",
    description:
      "Footwear designed to protect and comfort sensitive feet, with non-binding, soft soles.",
    image: "/shoes.jpeg",
    alt: "Pair of orthopedic diabetic-friendly shoes",
    price: "Rs 1000",
    category: "mobility",
    priceValue: 1000,
  },
];

// Custom SearchAndFilter component
const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "hearing", name: "Hearing Assistance" },
    { id: "vision", name: "Visual Assistance" },
    { id: "mobility", name: "Mobility Aids" },
    { id: "sensory", name: "Sensory Tools" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under1000", name: "Under ₹1,000" },
    { id: "1000-5000", name: "₹1,000 - ₹5,000" },
    { id: "above5000", name: "Above ₹5,000" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilterChange({ category: value, price: selectedPrice });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrice(value);
    onFilterChange({ category: selectedCategory, price: value });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    onSearchChange("");
    onFilterChange({ category: "all", price: "all" });
  };

  return (
    <div className="mb-8">
      <h2 id="search-filter-heading" className="sr-only">
        Search and Filter Options
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span
              className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="search"
              id="product-search"
              name="product-search"
              className="block w-full pl-12 pr-10 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-describedby="search-description"
            />
          </div>
          <div id="search-description" className="sr-only">
            Type to search for products by name or description
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full px-3 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="price-filter" className="sr-only">
            Filter by price
          </label>
          <select
            id="price-filter"
            value={selectedPrice}
            onChange={handlePriceChange}
            className="block w-full px-3 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {priceRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedCategory !== "all" || selectedPrice !== "all") && (
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-3 bg-gray-50 text-gray-700 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium border border-gray-200"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Active filters display */}
      {(selectedCategory !== "all" || selectedPrice !== "all" || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-sm text-gray-500">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Search: {searchQuery}
            </span>
          )}

          {selectedCategory !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Category: {categories.find((c) => c.id === selectedCategory)?.name}
            </span>
          )}

          {selectedPrice !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Price: {priceRanges.find((p) => p.id === selectedPrice)?.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

// Custom Modal component
const Modal = ({ isOpen, onClose, title, children, style = {} }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <dialog
          className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto border-0"
          style={style}
          aria-labelledby={title ? "modal-title" : undefined}
          open
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b">
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </dialog>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

// Custom CheckoutModal component
const CheckoutModal = ({ isOpen, onClose, orderPlaced, onCheckout, isProcessing }) => {
  // Automatically trigger checkout when modal opens and order is not placed yet
  useEffect(() => {
    if (isOpen && !orderPlaced && !isProcessing) {
      onCheckout();
    }
  }, [isOpen, orderPlaced, isProcessing, onCheckout]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checkout" style={{ width: "800px" }}>
      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Order...</h3>
          <p className="text-gray-600">Please wait while we process your order.</p>
        </div>
      )}
      {orderPlaced && !isProcessing && (
        <div className="text-center py-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been processed.
          </p>

          {/* Dummy Order Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">🎭</span>
              <h4 className="text-lg font-bold text-orange-800">Workshop Demo Notice</h4>
            </div>
            <p className="text-orange-700 font-medium">
              Just kidding! This is a dummy order. Your items won't actually be shipped because this
              is just a workshop demo.
            </p>
          </div>

          <div className="mt-6">
            <Button onClick={onClose} variant="primary" ariaLabel="Close order confirmation">
              Close Modal
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

CheckoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderPlaced: PropTypes.bool.isRequired,
  onCheckout: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

// Custom AddToCartModal component
const AddToCartModal = ({ product, onAddToCart, onClose, isOpen, cart, openCartModal }) => {
  const [quantity, setQuantity] = useState(1);

  // Set quantity based on cart status when modal opens
  useEffect(() => {
    if (isOpen && product) {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity > 0) {
        setQuantity(existingItem.quantity);
      } else {
        setQuantity(0); // Start with zero for new items
      }
    }
  }, [isOpen, product, cart]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose(); // Close modal after adding to cart
  };

  const handleGoToCart = () => {
    onClose();
    openCartModal();
  };

  if (!isOpen || !product) {
    return null;
  }

  // Check if item is already in cart with quantity > 0
  const existingItem = cart.find((item) => item.id === product.id);
  const isInCart = !!existingItem && existingItem.quantity > 0;

  // Button text and aria label logic
  const getButtonText = () => {
    if (quantity === 0 && isInCart) return "Remove from Cart";
    if (quantity === 0) return "Select Quantity";
    if (isInCart) return `Update Cart`;
    return "Add to Cart";
  };

  const getAriaLabel = () => {
    if (quantity === 0 && isInCart) return "Remove from cart";
    if (quantity === 0) return "Select quantity to add to cart";
    if (isInCart) return "Update cart quantity";
    return "Add to Cart";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      style={{ width: "90%", maxWidth: "700px" }}
    >
      <div className="mb-4">
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold">{product.price}</span>

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            minQuantity={0}
            ariaLabel={`Quantity selector for ${product.name}`}
          />
        </div>

        <div className="flex justify-end mb-4">
          <Button
            onClick={handleAddToCart}
            variant={quantity === 0 && isInCart ? "secondary" : "primary"}
            disabled={quantity === 0 && !isInCart}
            ariaLabel={getAriaLabel()}
            className={`${quantity === 0 && !isInCart ? "opacity-50 cursor-not-allowed" : ""} ${
              quantity === 0 && isInCart
                ? "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                : ""
            }`}
          >
            {getButtonText()}
          </Button>
        </div>

        {/* Go to Cart Link */}
        <div className="text-center mt-4 pt-4 border-t">
          <button
            onClick={handleGoToCart}
            tabIndex="-1"
            className="text-blue-600 hover:text-blue-800 underline text-sm font-medium focus:outline-none rounded-md px-2 py-1"
            aria-label="Go to cart"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
};

AddToCartModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }),
  onAddToCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired,
  openCartModal: PropTypes.func.isRequired,
};

// Custom CartModal component
const CartModal = ({
  cart,
  isOpen,
  onClose,
  removeFromCart,
  updateCartItemQuantity,
  onCheckout,
}) => {
  const totalPrice = cart.reduce((sum, item) => {
    const priceText =
      typeof item.price === "string" ? item.price.replace(/[^\d.-]/g, "") : item.price;
    const priceValue = parseFloat(priceText);
    return sum + priceValue * item.quantity;
  }, 0);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your Cart"
      style={{ width: "90%", maxWidth: "900px" }}
    >
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={onClose} variant="primary">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center">
                <div className="h-20 w-20 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-600">{item.price}</p>
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      onDecrease={() =>
                        updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      minQuantity={1}
                      size="small"
                      ariaLabel={`Quantity selector for ${item.name}`}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 p-1"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">Rs {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => cart.forEach((item) => removeFromCart(item.id))}
                variant="secondary"
                ariaLabel="Clear cart"
              >
                Clear Cart
              </Button>
              <div
                onClick={onCheckout}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 cursor-pointer"
                ariaLabel="Proceed to checkout"
              >
                Checkout
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

const ECommContainer = ({ cartContext }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "all", price: "all" });
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

      // Category filter
      const matchesCategory = filters.category === "all" || product.category === filters.category;

      // Price filter
      let matchesPrice = true;
      if (filters.price !== "all") {
        switch (filters.price) {
          case "under1000":
            matchesPrice = product.priceValue < 1000;
            break;
          case "1000-5000":
            matchesPrice = product.priceValue >= 1000 && product.priceValue <= 5000;
            break;
          case "above5000":
            matchesPrice = product.priceValue > 5000;
            break;
          // No default needed as matchesPrice is already true
        }
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
          <div className="text-center py-8" aria-live="polite">
            <p className="text-lg text-gray-600">No products match your search criteria.</p>
            <p className="mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Results count for screen readers */}
        {filteredProducts.length > 0 && (
          <div className="sr-only" aria-live="polite">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </div>
        )}

        <ul className="grid grid-cols-2  gap-4">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
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
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
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
