# Accessibility Workshop Guide

## Workshop Scenario Brief – Step-by-Step Accessibility Fixes

Welcome to the **Accessibility Workshop**! This demo e-commerce page is designed to work fine with a mouse but has clear accessibility issues when using only a keyboard or screen reader.

During this workshop, you'll progressively **fix these issues step by step**, learning how small changes can transform the experience for differently-abled shoppers.

## 🎯 The Storyline

Follow the journey of a **differently-abled shopper** trying to buy essential items:
- **Prescription Glasses** 👓
- **Mobility Stickers** 🦽  
- **Braille Labels** 🔤
- **Hearing Aid Batteries** 🔋
- **Accessible Door Handle** 🚪

## 🚨 Current Accessibility Issues

### 1. **Missing Skip Link**
- **Problem**: No way to skip navigation and jump to main content
- **Impact**: Screen reader users must navigate through all navigation items
- **Fix**: Add a skip link that appears on focus

### 2. **Improper Button Semantics**
- **Problem**: Clickable elements use `<div>` instead of `<button>` or proper ARIA roles
- **Impact**: Screen readers don't recognize them as interactive elements
- **Fix**: Convert to proper `<button>` elements or add `role="button"` with `tabindex="0"`

### 3. **Missing Form Labels**
- **Problem**: Search input has no associated label
- **Impact**: Screen reader users don't know what the input is for
- **Fix**: Add proper `<label>` elements or `aria-label` attributes

### 4. **Keyboard Navigation Issues**
- **Problem**: Custom dropdown and modal interactions don't support keyboard
- **Impact**: Keyboard-only users cannot access all functionality
- **Fix**: Implement proper keyboard event handlers (Enter, Space, Escape, Arrow keys)

### 5. **Missing ARIA Live Regions**
- **Problem**: Dynamic content changes (cart updates) have no screen reader feedback
- **Impact**: Users don't know when cart items are added/removed
- **Fix**: Add `aria-live` regions for cart updates

### 6. **Focus Management Problems**
- **Problem**: Modal opens without proper focus management
- **Impact**: Screen reader focus gets lost, users can't navigate modal
- **Fix**: Trap focus in modal, return focus when closed

### 7. **Missing ARIA Attributes**
- **Problem**: Modal close button lacks proper semantics
- **Impact**: Screen readers don't understand the close functionality
- **Fix**: Add `aria-label="Close modal"` and proper button semantics

## 🔧 Step-by-Step Fixes

### Step 1: Add Skip Link
```jsx
// Add this at the top of the page
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
>
  Skip to main content
</a>

// Add id to main content
<main id="main-content" className="container mx-auto px-4 py-8">
```

### Step 2: Fix Button Semantics
```jsx
// Replace div with button for cart icon
<button 
  className="relative p-2"
  aria-label={`Shopping cart with ${cart.length} items`}
  onClick={() => {/* handle cart click */}}
>
  <span className="text-lg">🛒</span>
  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {cart.length}
    </span>
  )}
</button>

// Fix Add to Cart buttons
<button 
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product);
  }}
>
  Add to Cart
</button>
```

### Step 3: Add Form Labels
```jsx
// Add proper label for search input
<label htmlFor="search-input" className="sr-only">
  Search products
</label>
<input
  id="search-input"
  type="text"
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
/>
```

### Step 4: Implement Keyboard Navigation
```jsx
// Add keyboard support for category dropdown
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  } else if (e.key === 'Escape') {
    setIsDropdownOpen(false);
  }
};

<div 
  role="combobox"
  aria-expanded={isDropdownOpen}
  aria-haspopup="listbox"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
>
  {categories.find(cat => cat.id === selectedCategory)?.name || 'All Products'}
</div>
```

### Step 5: Add ARIA Live Regions
```jsx
// Add live region for cart updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {cart.length === 0 ? 'Cart is empty' : `${cart.length} items in cart`}
</div>

// Update addToCart function
const addToCart = (product) => {
  setCart([...cart, product]);
  // Announce to screen readers
  const announcement = `${product.name} added to cart`;
  // You can use a ref to update the live region
};
```

### Step 6: Implement Focus Management
```jsx
// Add refs for focus management
const modalRef = useRef(null);
const previousFocusRef = useRef(null);

const openProductModal = (product) => {
  setSelectedProduct(product);
  setShowModal(true);
  previousFocusRef.current = document.activeElement;
  
  // Focus modal after it opens
  setTimeout(() => {
    modalRef.current?.focus();
  }, 100);
};

const closeModal = () => {
  setShowModal(false);
  setSelectedProduct(null);
  
  // Return focus to previous element
  previousFocusRef.current?.focus();
};

// Add focus trap to modal
useEffect(() => {
  if (showModal) {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements?.length) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }
}, [showModal]);
```

### Step 7: Fix Modal Accessibility
```jsx
// Add proper modal semantics
{showModal && selectedProduct && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div 
      ref={modalRef}
      className="bg-white rounded-lg p-6 max-w-md w-full"
      tabIndex={-1}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 id="modal-title" className="text-xl font-semibold">
          {selectedProduct.name}
        </h3>
        <button 
          className="text-2xl p-1 hover:bg-gray-100 rounded"
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      <p id="modal-description" className="text-gray-600 mb-4">
        {selectedProduct.description}
      </p>
      {/* ... rest of modal content ... */}
    </div>
  </div>
)}
```

## 🧪 Testing Your Fixes

### Keyboard Testing
1. **Tab Navigation**: Press Tab to move through all interactive elements
2. **Enter/Space**: Activate buttons and form controls
3. **Escape**: Close modals and dropdowns
4. **Arrow Keys**: Navigate dropdown options

### Screen Reader Testing
1. **NVDA** (Windows) or **VoiceOver** (Mac)
2. **Navigate by headings**: H key to jump between headings
3. **Navigate by landmarks**: R key to jump between regions
4. **Listen for announcements**: Cart updates, form labels, button descriptions

### Focus Testing
1. **Visible focus indicator**: All focusable elements should have clear focus styles
2. **Focus order**: Tab order should follow logical page flow
3. **Focus management**: Modal focus should be trapped and restored

## 🎉 Success Criteria

Your page is accessible when:
- ✅ Skip link allows quick navigation to main content
- ✅ All interactive elements are keyboard accessible
- ✅ Form inputs have proper labels
- ✅ Dynamic content updates are announced to screen readers
- ✅ Modals have proper focus management
- ✅ All buttons and controls have proper semantics
- ✅ Focus indicators are visible and logical

## 🚀 Bonus Challenges

1. **Add error handling** with proper ARIA error messages
2. **Implement loading states** with `aria-busy` and `aria-live`
3. **Add keyboard shortcuts** for common actions
4. **Create a focus order diagram** for your page
5. **Test with different screen readers** and note any differences

## 📚 Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [Focus Management Best Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

Happy accessibility fixing! 🎯♿
