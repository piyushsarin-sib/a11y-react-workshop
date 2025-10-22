import React, { useState, useContext } from "react";

import AddToCartModal from "@components/features/AddToCart";
import AccessibilityCarousel from "@components/features/AccessibilityCarousel";
import SearchAndFilter from "@components/features/SearchAndFilter";
import ProductList from "@components/features/ProductList";
import Panel from "@components/common/Panel";
import CartModal from "@components/features/Cart/CartModal";
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';


import { useDialog } from "@lib/Overlay";
import { CartContext } from "@context/CartContextCore";
import { CartProvider } from '@context/CartContext.jsx';


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
    price: "Rs 8000–25000",
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
    price: "Rs 1000–3000 per pair",
    category: "mobility",
    priceValue: 1000,
  },
];

const ECommerce = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ categories: [], prices: [] });
  const { addToCart } = useContext(CartContext);

  const addToCartModalState = useDialog({
    bodyId: 'add-to-cart-modal',
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    addToCartModalState.open();
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    addToCartModalState.close();
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

      // Category filter - empty array means show all, otherwise match selected categories
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(product.category);

      // Price filter - empty array means show all, otherwise match any selected price range
      const matchesPrice =
        filters.prices.length === 0 ||
        filters.prices.some((priceRange) => {
          switch (priceRange) {
            case "under1000":
              return product.priceValue < 1000;
            case "1000-5000":
              return product.priceValue >= 1000 && product.priceValue <= 5000;
            case "above5000":
              return product.priceValue > 5000;
            default:
              return false;
          }
        });

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, filters]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 id="products-heading" className="text-3xl font-bold my-8">
          Building Accessible Experiences
        </h1>

        {/* Accessibility Carousel */}
        <AccessibilityCarousel />

        <Panel className="my-6">
          <h2 className="text-2xl font-bold mb-4">Accessible Products</h2>
          <p className="mb-6">
            Explore our accessible products designed for everyone, including people with
            disabilities.
          </p>

          {/* Search and Filter Component */}
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
        </Panel>

        {/* Product List Component */}
        <ProductList products={filteredProducts} onAddToCart={handleOpenModal} />
      </div>

      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={handleCloseModal}
          modalState={addToCartModalState}
        />
      )}
      <CartModal />
    </>
  );
};

const ECommercePage = () => {
  return (
    <CartProvider>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Skip to main content link - first focusable element */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <ECommerce/>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};


export default ECommercePage;
