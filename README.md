# ♿ Accessible React Workshop

A comprehensive workshop and learning platform focused on building accessible React applications. This project demonstrates common accessibility issues and provides step-by-step solutions for developers to learn and practice accessibility best practices.

## 🎯 Overview

This workshop is designed to teach developers how to build truly accessible web applications using React. Through hands-on examples, interactive demos, and real-world scenarios, participants learn to identify and fix accessibility barriers that prevent users with disabilities from effectively using web applications.

### Key Features

- **Interactive Learning**: Hands-on exercises with before/after comparisons
- **Real-world Scenarios**: E-commerce example with intentional accessibility issues
- **Comprehensive Coverage**: From basic ARIA attributes to complex focus management
- **Modern Tooling**: Built with React 19, Vite, and Tailwind CSS
- **Strict Linting**: Zero-tolerance accessibility linting with jsx-a11y
- **Production Ready**: Error boundaries, performance optimization, and SEO
- **Advanced Focus Management**: Improved focus traps with dynamic element detection
- **Accessible Grid Patterns**: Adobe spec-compliant card grids with dual navigation (Tab + Arrow keys)
- **Enhanced Modal UX**: Streamlined checkout and cart interactions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd accessible-react-workshop

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

The application will be available at `http://localhost:3009`

## 📁 Project Structure

```
accessible-react-workshop/
├── 📁 docs/                          # Documentation
│   └── ACCESSIBILITY_LINTING.md      # Accessibility linting guide
├── 📁 public/                        # Static assets
│   ├── accessibility.png             # App icon
│   ├── *.jpeg                        # Workshop images
│   └── _redirects                    # Vercel redirects
├── 📁 src/                           # Source code
│   ├── 📁 components/                # React components
│   │   ├── 📁 common/                # Reusable UI components
│   │   │   ├── 📁 Badge/             # Badge component
│   │   │   ├── 📁 Breadcrumbs/       # Navigation breadcrumbs
│   │   │   ├── 📁 Button/            # Accessible button component
│   │   │   ├── 📁 Card/              # Card layout component
│   │   │   ├── 📁 Carousel/          # Accessible carousel
│   │   │   ├── 📁 Checkbox/          # Form checkbox component
│   │   │   ├── 📁 FormGroup/         # Form wrapper with accessibility
│   │   │   ├── 📁 Icon/              # Icon component
│   │   │   ├── 📁 Input/             # Accessible input component
│   │   │   ├── 📁 Link/              # Accessible link component
│   │   │   ├── 📁 Modal/             # Accessible modal with focus management
│   │   │   ├── 📁 Panel/             # Content panel component
│   │   │   ├── 📁 QuantitySelector/  # Quantity input component
│   │   │   ├── 📁 Radio/             # Radio button component
│   │   │   ├── 📁 RadioGroup/        # Radio group component
│   │   │   ├── 📁 Rating/            # Star rating component
│   │   │   ├── 📁 Select/            # Dropdown select component
│   │   │   └── 📁 Toast/             # Notification toast component
│   │   ├── 📁 features/              # Feature-specific components
│   │   │   ├── 📁 AccessibilityCarousel/ # Accessibility info carousel
│   │   │   ├── 📁 AddToCart/         # Add to cart functionality
│   │   │   ├── 📁 Cart/              # Shopping cart components
│   │   │   ├── 📁 Checkout/          # Checkout flow components
│   │   │   ├── 📁 AccessibilityBanner/ # Accessibility info banner
│   │   │   ├── 📁 OrderConfirmation/ # Order confirmation flow
│   │   │   ├── 📁 Product/           # Product display components
│   │   │   ├── 📁 ProductList/       # Product listing with accessible grid
│   │   │   └── 📁 SearchAndFilter/   # Search and filtering
│   │   ├── 📁 layout/                # Layout components
│   │   │   ├── 📁 Footer/            # Site footer
│   │   │   ├── 📁 Header/            # Site header with navigation
│   │   │   └── 📁 Layout/            # Main layout wrapper
│   │   ├── Footer.jsx                # Legacy footer (deprecated)
│   │   ├── Header.jsx                # Legacy header (deprecated)
│   │   └── Layout.jsx                # Legacy layout (deprecated)
│   ├── 📁 context/                   # React Context providers
│   │   ├── CartContext.js            # Legacy cart context
│   │   ├── CartContext.jsx           # Main cart context
│   │   ├── CartContextCore.js        # Core cart logic
│   │   └── CartContextCore.jsx       # Core cart context
│   ├── 📁 demos/                     # Interactive demonstrations
│   │   ├── 📁 Expansion/             # Accordion and tree examples
│   │   │   ├── AccordionExample.jsx
│   │   │   ├── CollapsibleTreeExample.jsx
│   │   │   ├── DynamicTreeControlledExample.jsx
│   │   │   ├── DynamicTreeExample.jsx
│   │   │   ├── StaticTreeControlledExample.jsx
│   │   │   └── StaticTreeExample.jsx
│   │   ├── 📁 HorizontalLists/       # Horizontal navigation examples
│   │   │   ├── ButtonGroupExample.jsx
│   │   │   ├── CardGridExample.jsx
│   │   │   ├── HorizontalListExample.css
│   │   │   ├── HorizontalListExample.jsx
│   │   │   ├── NavigationMenuExample.jsx
│   │   │   └── TagListExample.jsx
│   │   ├── 📁 KeyboardNavigation/    # Keyboard navigation examples
│   │   │   ├── Grid2DNavigationExample.jsx
│   │   │   ├── HorizontalNavigationExample.jsx
│   │   │   ├── RovingIndexExample.jsx
│   │   │   └── VerticalNavigationExample.jsx
│   │   ├── 📁 Overlay/               # Dialog and overlay examples
│   │   │   ├── MenuWithOverlay.jsx
│   │   │   ├── DialogExample.jsx
│   │   │   └── SimpleTooltip.jsx
│   │   ├── 📁 Selection/             # Selection pattern examples
│   │   │   ├── EmptyMenuExample.jsx
│   │   │   ├── MultiSelectionExample.jsx
│   │   │   ├── SectionedMenuExample.jsx
│   │   │   ├── SelectionExample.css
│   │   │   ├── SimpleMenuExample.jsx
│   │   │   └── SingleSelectionExample.jsx
│   │   ├── 📁 VerticalLists/         # Vertical list examples
│   │   │   ├── BasicListExample.jsx
│   │   │   ├── ListExample.css
│   │   │   ├── ListExample.jsx
│   │   │   ├── NestedCollectionWithTitlesExample.jsx
│   │   │   └── StyledListExample.jsx
│   │   └── index.js                  # Demo exports
│   ├── 📁 lib/                       # Reusable libraries and utilities
│   │   ├── 📁 Accordion/             # Accordion component library
│   │   │   ├── Accordion.css
│   │   │   ├── Accordion.jsx
│   │   │   └── index.js
│   │   ├── 📁 Collections/           # Collection management utilities
│   │   │   ├── Collection.css
│   │   │   ├── Collection.jsx        # Enhanced collection component with grid support
│   │   │   ├── 📁 components/        # Collection sub-components
│   │   │   │   └── Item.jsx          # Collection item wrapper
│   │   │   ├── 📁 constants/         # ARIA configuration constants
│   │   │   │   └── aria-config.js    # Grid and list ARIA patterns
│   │   │   ├── 📁 hooks/
│   │   │   │   └── useCollectionAria.js
│   │   │   ├── 📁 utils/             # Collection utility functions
│   │   │   │   ├── createCollectionAria.js
│   │   │   │   ├── createItemAria.js
│   │   │   │   ├── expandableItemUtils.js
│   │   │   │   ├── getItemKey.js
│   │   │   │   └── primitives.js
│   │   │   ├── CollectionContext.js  # Collection context
│   │   │   └── index.js
│   │   ├── 📁 interactions/          # Interaction pattern libraries
│   │   │   ├── 📁 expansion/         # Expansion patterns
│   │   │   │   └── useExpandable.js  # Expandable item hook
│   │   │   ├── 📁 keyboard/          # Keyboard navigation patterns
│   │   │   │   ├── 📁 delegates/     # Navigation delegates
│   │   │   │   │   ├── grid2DDelegate.js
│   │   │   │   │   ├── horizontalDelegate.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── linear1DDelegate.js
│   │   │   │   ├── 📁 hooks/
│   │   │   │   │   ├── useRovingIndex.js    # Roving tabindex pattern
│   │   │   │   │   └── useArrowNavigation.js # Arrow key navigation
│   │   │   │   └── 📁 utils/
│   │   │   │       └── keyboardPrimitives.js
│   │   │   └── 📁 selection/         # Selection patterns
│   │   │       └── useSelectionManager.js
│   │   ├── 📁 Menu/                  # Menu component library
│   │   │   ├── 📁 hooks/
│   │   │   │   └── useMenu.js
│   │   │   ├── index.js
│   │   │   ├── Menu.jsx
│   │   │   ├── MenuContext.js
│   │   │   ├── MenuList.jsx
│   │   │   ├── MenuOption.jsx
│   │   │   ├── MenuSection.jsx
│   │   │   └── MenuTitle.jsx
│   │   ├── 📁 Tree/                  # Tree component library
│   │   │   ├── index.js
│   │   │   ├── Tree.css
│   │   │   └── Tree.jsx
│   │   └── 📁 Overlay/               # Overlay management system
│   │       ├── 📁 components/        # Overlay components
│   │       │   ├── DialogOverlay.jsx
│   │       │   ├── Popover.jsx
│   │       │   ├── PopoverBackdrop.jsx
│   │       │   ├── PopoverContent.jsx
│   │       │   └── Tooltip.jsx
│   │       ├── constants.js          # Overlay constants
│   │       ├── 📁 helpers/           # Overlay helper functions
│   │       │   ├── createFocusTrap.js
│   │       │   ├── getFocusableElements.js
│   │       │   ├── getScrollbarWidth.js
│   │       │   ├── inertOthers.js
│   │       │   └── platform.js
│   │       ├── 📁 hooks/             # Overlay hooks
│   │       │   ├── useClickOutside.js
│   │       │   ├── 📁 useFocusManagement/
│   │       │   │   ├── index.js
│   │       │   │   ├── useAutoFocus.js
│   │       │   │   ├── useRestoreFocus.js
│   │       │   │   └── useStoreFocus.js
│   │       │   ├── useInert.js
│   │       │   ├── useKeyboardHandlers.js
│   │       │   ├── useOverlay.js
│   │       │   ├── usePosition.js
│   │       │   └── useScrollLock.js
│   │       ├── index.js
│   │       └── Overlay.css
│   ├── 📁 pages/                     # Main application pages
│   │   ├── 📁 DemoPage/              # Demo showcase page
│   │   ├── 📁 ECommercePage/         # E-commerce workshop page
│   │   ├── 📁 ExercisesPage/         # Exercise instructions page
│   │   └── 📁 LandingPage/           # Home page
│   ├── 📁 playground/                # Interactive playground components
│   │   ├── 📁 ECommIssues/           # E-commerce accessibility issues
│   │   │   ├── ECommIssues.jsx       # Main issues demonstration
│   │   │   ├── index.js              # Export
│   │   │   └── 📁 Layout/            # E-commerce layout
│   │   ├── 📁 Ex1-CardWrapper/       # Exercise 1: Card wrapper accessibility
│   │   │   ├── CardWrapper.jsx       # Issues demonstration
│   │   │   ├── Step-0.jsx            # Starting point with issues
│   │   │   ├── Step-1.jsx            # Fix semantic HTML
│   │   │   ├── Step-2.jsx            # Add proper ARIA
│   │   │   ├── Step-3.jsx            # Implement keyboard navigation
│   │   │   ├── Step-4.jsx            # Complete solution
│   │   │   ├── solved.jsx            # Final solved version
│   │   │   └── index.js              # Export
│   │   ├── 📁 Ex2-TreeList/          # Exercise 2: Tree navigation
│   │   │   ├── TreeList.jsx          # Issues demonstration
│   │   │   ├── Tree.jsx              # Tree component
│   │   │   ├── Step-0.jsx            # Starting point
│   │   │   ├── Step-1.jsx            # Fix ARIA roles
│   │   │   ├── Step-2.jsx            # Add keyboard navigation
│   │   │   ├── Step-3.jsx            # Implement expansion/collapse
│   │   │   ├── 📁 solved/            # Solved components
│   │   │   ├── Checkpoints.jsx       # Progress checkpoints
│   │   │   ├── withErrorBoundary.jsx # Error boundary HOC
│   │   │   └── index.js              # Export
│   │   ├── 📁 Ex3-FilterMenu/        # Exercise 3: Filter menu accessibility
│   │   │   ├── FilterMenu.jsx        # Issues demonstration
│   │   │   ├── FilterTrigger.jsx     # Menu trigger component
│   │   │   ├── Step-0.jsx            # Starting point
│   │   │   ├── Step-1.jsx            # Fix menu semantics
│   │   │   ├── Step-2.jsx            # Add keyboard navigation
│   │   │   ├── Step-3.jsx            # Implement focus management
│   │   │   ├── Step-4.jsx            # Complete solution
│   │   │   ├── solved.jsx            # Final solved version
│   │   │   ├── Checkpoints.jsx       # Progress checkpoints
│   │   │   └── index.js              # Export
│   │   ├── 📁 Ex4-AddToCartModal/    # Exercise 4: Modal accessibility
│   │   │   ├── AddToCartModal.jsx    # Issues demonstration
│   │   │   ├── Step-0.jsx            # Starting point
│   │   │   ├── Step-1.jsx            # Fix focus trap
│   │   │   ├── solved.jsx            # Final solved version
│   │   │   ├── Checkpoints.jsx       # Progress checkpoints
│   │   │   └── index.js              # Export
│   │   ├── 📁 Ex5-EdgeCases/         # Exercise 5: Edge cases & advanced patterns
│   │   │   ├── EdgeCases.jsx         # Issues demonstration
│   │   │   ├── Step-0.jsx            # Starting point with issues
│   │   │   ├── Step-1.jsx            # Fix heading hierarchy
│   │   │   ├── Step-2.jsx            # Add skip links
│   │   │   ├── Step-3.jsx            # Add live regions
│   │   │   ├── solved.jsx            # Complete solution
│   │   │   └── index.js              # Export
│   │   └── index.js                  # Playground exports
│   ├── 📁 solved/                    # Solved examples
│   │   ├── 📁 Card/                  # Solved card component
│   │   ├── 📁 EdgeCases/             # Solved edge cases
│   │   └── index.js                  # Solved exports
│   ├── 📁 styles/                    # Global styles and CSS
│   │   ├── accessibility.css         # Accessibility-specific styles
│   │   ├── index.css                 # Main stylesheet
│   │   └── tokens.css                # Design tokens and CSS variables
│   ├── App.jsx                       # Main application component
│   └── main.jsx                      # Application entry point
├── 📄 .gitignore                     # Git ignore rules
├── 📄 eslint.config.js               # ESLint configuration
├── 📄 index.html                     # HTML template
├── 📄 jsconfig.json                  # JavaScript configuration
├── 📄 LICENSE                        # MIT License
├── 📄 package.json                   # Dependencies and scripts
├── 📄 package-lock.json              # Dependency lock file
├── 📄 postcss.config.js              # PostCSS configuration
├── 📄 README.md                      # This file
├── 📄 setup-git-aliases.sh           # Git alias setup script
├── 📄 tailwind.config.js             # Tailwind CSS configuration
├── 📄 vercel.json                    # Vercel deployment configuration
├── 📄 vite.config.js                 # Vite build configuration
├── 📄 WORKSHOP_GUIDE.md              # Detailed workshop instructions
└── 📄 yarn.lock                      # Yarn lock file
```

## 🎓 Workshop Structure

### **Phase 1: Identify Issues**
- Navigate the e-commerce page with mouse (seems fine)
- Try keyboard-only navigation (exposes problems)
- Use screen reader to understand the experience
- Document accessibility barriers

### **Phase 2: Progressive Fixes**
1. **Skip Links** - Quick navigation to main content
2. **Heading Hierarchy** - Proper h1 → h2 → h3 structure
3. **Button Semantics** - Proper interactive element markup
4. **Form Labels** - Clear input descriptions
5. **Keyboard Navigation** - Full keyboard support with Tab and Arrow keys
6. **ARIA Live Regions** - Dynamic content announcements for cart updates
7. **Focus Management** - Advanced focus trapping with disabled element handling
8. **Focus Restoration** - Automatic return to previously focused element
9. **Modal Accessibility** - Screen reader support with proper ARIA attributes
10. **Grid Patterns** - Adobe spec-compliant card grids with row/rowheader pattern

### **Phase 3: Testing & Validation**
- **Keyboard testing** - Tab navigation, Enter/Space activation
- **Screen reader testing** - NVDA, VoiceOver, JAWS
- **Focus testing** - Visible indicators and logical order
- **WCAG compliance** - Meeting accessibility standards

## 🛠️ Available Scripts

```bash
# Development
npm start          # Start development server
npm run dev        # Alternative dev command

# Building
npm run build      # Build for production
npm run preview    # Preview production build

# Linting
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run lint:a11y  # Run accessibility-specific linting

# Git hooks
npm run prepare    # Setup Husky git hooks
```

## 🎨 Key Components

### **Common Components** (`src/components/common/`)
Reusable UI components with built-in accessibility features:

- **Button** - Accessible button with loading states and variants
- **Input** - Form input with proper labeling and error handling
- **Modal** - Accessible modal with advanced focus management and restoration
- **DialogOverlay** - Dialog with backdrop click handling and Escape key support
- **FormGroup** - Form wrapper with accessibility enhancements
- **Carousel** - Accessible image/content carousel
- **Checkbox/Radio** - Accessible form controls with proper ARIA
- **QuantitySelector** - Increment/decrement controls with keyboard support

### **Feature Components** (`src/components/features/`)
Business logic components for the e-commerce workshop:

- **Product** - Product display and interaction
- **ProductList** - Accessible product grid with Adobe card spec (role="grid", row/rowheader pattern)
- **Cart** - Shopping cart with live region announcements
- **AddToCart** - Modal with dynamic button states and keyboard-inaccessible "Go to Cart" link
- **Checkout** - Streamlined checkout with immediate order placement
- **AccessibilityBanner** - Informational banner about accessibility features
- **SearchAndFilter** - Product search and filtering
- **OrderConfirmation** - Checkout completion flow

### **Demo Components** (`src/demos/`)
Interactive examples demonstrating accessibility patterns:

- **Keyboard Navigation** - Roving tabindex, arrow key navigation, dual navigation (Tab + Arrows)
- **Selection Patterns** - Single/multi-select with proper ARIA
- **Overlay Components** - Modals, tooltips, dropdowns with focus traps
- **List Components** - Accessible lists and grids with proper ARIA attributes
- **Grid Navigation** - 2D grid navigation with aria-rowindex and aria-colindex

## 🔧 Development Guidelines

### **Accessibility Standards**
- **WCAG 2.1 AA** compliance
- **ARIA 1.1** implementation
- **Adobe Accessibility Specifications** for card grids
- **Keyboard navigation** support (Tab, Arrow keys, Enter, Space, Escape)
- **Screen reader** compatibility (NVDA, JAWS, VoiceOver)
- **Color contrast** requirements (4.5:1 for normal text)
- **Focus indicators** visible on all interactive elements

### **Code Quality**
- **ESLint** with jsx-a11y plugin
- **PropTypes** for type checking
- **Consistent naming** conventions
- **Component composition** patterns
- **Error boundaries** for resilience

### **Testing Approach**
- **Keyboard-only** navigation testing (Tab, Shift+Tab, Arrow keys, Enter, Space, Escape)
- **Screen reader** testing (NVDA, VoiceOver, JAWS)
- **Color contrast** validation (WebAIM Contrast Checker)
- **Focus management** verification (focus traps, restoration, visible indicators)
- **ARIA implementation** testing (role, aria-label, aria-labelledby, aria-describedby)
- **Disabled state** handling (excluding disabled elements from focus traps)
- **Grid patterns** validation (aria-rowcount, aria-colcount, aria-rowindex, aria-colindex)

## 📚 Learning Resources

### **Accessibility Guidelines**
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Adobe Accessibility Specifications](https://opensource.adobe.com/spectrum-web-components/components/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [Focus Management Best Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Grid Pattern ARIA Specification](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)

### **React Accessibility**
- [React Accessibility Documentation](https://reactjs.org/docs/accessibility.html)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** accessibility best practices
4. **Test** with keyboard and screen readers
5. **Submit** a pull request

### **Development Setup**
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Live Demo

Visit the live workshop at: [https://accessible-react-workshop-99af.vercel.app](https://accessible-react-workshop-99af.vercel.app)

## 🌟 Recent Enhancements

### **Focus Management Improvements**
- ✅ Enhanced focus trap with dynamic disabled element detection
- ✅ Automatic focus restoration to previously focused element
- ✅ `getFocusableElements()` function that queries fresh on Tab key press
- ✅ Proper handling of Escape key with `preventDefault()`
- ✅ Timeout-based focus to ensure DOM readiness

### **Product Grid Accessibility**
- ✅ Adobe spec-compliant card grid pattern
- ✅ `role="grid"` with `role="row"` and `role="rowheader"` structure
- ✅ Proper ARIA attributes: `aria-rowindex`, `aria-colindex`, `aria-labelledby`, `aria-describedby`
- ✅ Dual navigation support: Tab for sequential navigation, Arrow keys for 2D navigation
- ✅ Collection component handles both navigation patterns automatically

### **E-Commerce UX Improvements**
- ✅ Streamlined checkout modal (immediate order placement)
- ✅ Enhanced AddToCart modal with "Go to Cart" link (keyboard-inaccessible by design)
- ✅ Dynamic button states based on quantity and cart status
- ✅ Larger, consistent modal sizes across playground and solved pages
- ✅ Updated footer links: Home, Best Practices, Reference links

### **Accessibility Banner**
- ✅ Non-button styling for disability type tags (Motor, Visual, Hearing, Cognitive)
- ✅ Pill-shaped badges with subtle borders instead of clickable-looking boxes

---

**Happy accessibility learning! 🎯♿**

*Remember: Accessibility isn't just about compliance - it's about creating inclusive experiences for all users.*