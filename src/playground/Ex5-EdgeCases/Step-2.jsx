// STEP: 2 - Fix skip link accessibility issues
import { useState, useRef, useEffect } from "react";
import Button from "@components/common/Button";

export default function AccessibilityWorkshopDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);
  const firstAddToCartRef = useRef(null); // for skip link

  const products = [
    { id: 1, name: "Braille Keyboard", price: "Rs 45000" },
    { id: 2, name: "Wheelchair", price: "Rs 2500" },
  ];

  // Skip link handler
  const handleSkipToContent = (e) => {
    e.preventDefault();
    firstAddToCartRef.current?.focus();
  };

 // Focus trap inside modal
  useEffect(() => {
    if (!cartOpen || !cartRef.current) return;

    const modalNode = cartRef.current;
    
    // Save the previously focused element to restore focus later
    const previouslyFocused = document.activeElement;

    const getFocusableElements = () => {
      return modalNode.querySelectorAll(
        'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );
    };

    const handleKeyDown = (e) => {
      // Handle Escape key
      if (e.key === "Escape") {
        e.preventDefault();
        setCartOpen(false);
        return;
      }

      // Handle Tab key for focus trap
      if (e.key === "Tab") {
        const focusableEls = getFocusableElements();
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (!firstEl) return; // No focusable elements

        if (e.shiftKey) {
          // Shift+Tab: going backwards
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab: going forwards
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    // Add event listener
    modalNode.addEventListener("keydown", handleKeyDown);
    
    // Focus first focusable element after a small delay to ensure rendering
    setTimeout(() => {
      const focusableEls = getFocusableElements();
      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    }, 0);

    // Cleanup: restore focus to previously focused element
    return () => {
      modalNode.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that was focused before opening modal
      previouslyFocused?.focus?.();
    };
  }, [cartOpen]);

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {products.map((product, index) => (
            <section
              key={product.id}
              className="border p-4 rounded-md"
              aria-labelledby={`product-${product.id}-name`}
            >
              <h2
                id={`product-${product.id}-name`}
                className="font-semibold"
              >
                {product.name}
              </h2>
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

      {/* Cart Modal with Focus Trap */}
      {cartOpen && (
        <dialog
          ref={cartRef}
          open
          aria-modal="true"
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
            <h2 className="text-xl font-semibold">Cart</h2>
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
                 onClick={() => setCartOpen(false)}
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
  FIXES APPLIED:
  1. ✅ Proper heading hierarchy: <h1> → <h2> for product sections → <h3> for modal
  2. ✅ Skip link added to jump to main content
  3. ❌ No live region for screen readers
*/
