import { useState, useRef, useEffect } from "react";
import Button from "@components/common/Button";

export default function AccessibilityWorkshopDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null); // to return focus after closing
  const firstAddToCartRef = useRef(null); // for skip link
  const liveRegionRef = useRef(null); // live region for screen readers

  const products = [
    { id: 1, name: "Braille Keyboard", price: "Rs 45000" },
    { id: 2, name: "Wheelchair", price: "Rs 2500" },
  ];

  // Handle skip to main content
  const handleSkipToContent = (e) => {
    e.preventDefault();
    firstAddToCartRef.current?.focus();
  };

  // Update live region on cart changes
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Cart updated: ${cartCount} item${cartCount !== 1 ? 's' : ''}`;
    }
  }, [cartCount]);

  return (
    <div>
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Skip Link */}
        <a
          href="#mainContent"
          onClick={handleSkipToContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-2 py-1 rounded z-50"
        >
          Skip to main content
        </a>

        <nav
          className="container mx-auto px-10 py-4 flex justify-between items-center"
          aria-label="Main Navigation"
        >
          <a className="text-2xl font-bold" href="/">
            Accessible eCommerce
          </a>

          <div className="flex items-center space-x-4">
            <a
              href="/products"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Products
            </a>
            <a
              href="/about"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              About
            </a>
            <a
              href="/contact"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
            >
              Contact
            </a>

            {/* Cart Button */}
            <Button
              ref={cartButtonRef}
              className="relative rounded-full"
              ariaLabel={`Open cart with ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              Cart ({cartCount})
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="mainContent" className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Shop Products</h1>

        {/* Live Region */}
        <div
          ref={liveRegionRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {products.map((product, index) => (
            <section
              key={product.id}
              className="border p-4 rounded-md"
              aria-labelledby={`product-${product.id}-name`}
            >
              <h3 id={`product-${product.id}-name`} className="font-semibold">
                {product.name}
              </h3>
              <p>{product.price}</p>

              <Button
                ref={index === 0 ? firstAddToCartRef : null} // first button for skip link
                className="mt-2"
                size="small"
                onClick={() => setCartCount(cartCount + 1)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </Button>
            </section>
          ))}
        </div>
      </main>

      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <dialog
          ref={cartRef}
          open
          aria-label="Shopping Cart"
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            border: "1px solid #333",
            padding: "1rem",
            zIndex: 50,
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <div className="flex flex-col gap-4">
            <h2>Cart</h2>
            <p>Items in your cart: {cartCount}</p>
            <div className="flex justify-between">
              <Button
                disabled={cartCount === 0}
                onClick={() => {
                  alert("Proceed to checkout");
                  setCartCount(0);
                  setCartOpen(false);
                }}
              >
                Checkout
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  setCartOpen(false);
                }}
              >
                Close Cart
              </Button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

/* 
  FIX APPLIED:
  ✅ Skip link for keyboard users.
  ✅ Live region added to announce cart updates.
  3. No focus trap in modal — keyboard can move outside modal when open.
*/
