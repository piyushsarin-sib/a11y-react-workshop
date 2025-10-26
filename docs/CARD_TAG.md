### **1. `card-0-list-issues`**

**Purpose:** Track all accessibility and usability issues intentionally introduced in the “broken” version of the `Card` component.
**Includes:**

* Non-semantic HTML tags (`div` instead of `<article>`, `<h3>`, `<p>`).
* Missing proper `alt` text on images.
* Missing ARIA attributes and associations (`aria-labelledby`, `aria-describedby`).
* No `focus-visible` styling for keyboard users.
* Transitions and animations without `motion-reduce` consideration.
  **Use:** Serves as a reference baseline for all issues before starting fixes.

---

### **2. `card-1-semantics`**

**Purpose:** Focus on fixing semantic HTML issues.
**Includes:**

* Replace generic `<div>`s with meaningful HTML5 elements:

  * `<article>` for the card wrapper.
  * `<h3>` for the product title.
  * `<p>` for description and price.
* Ensure proper heading hierarchy and text grouping for screen readers.
  **Use:** Improves structural accessibility and SEO, making content understandable by assistive technologies.

---

### **3. `card-2-images-desc`**

**Purpose:** Fix image accessibility issues.
**Includes:**

* Provide descriptive and meaningful `alt` text for product images.
* Ensure `alt` conveys content and purpose of the image, not just placeholder text.
* Optional: Use `role="presentation"` if the image is purely decorative.
  **Use:** Helps screen reader users understand visual content.

---

### **4. `card-3-associations-labels`**

**Purpose:** Restore ARIA attributes and relationships.
**Includes:**

* Link card title, description, and price to the card via `aria-labelledby` and `aria-describedby`.
* Update `aria-label` on buttons to include dynamic content (`Add {title} to cart`).
* Ensure all interactive elements are correctly associated with their labels.
  **Use:** Improves accessibility for assistive technologies by making content and controls understandable.

---

### **5. `card-4-focus-visible`**

**Purpose:** Fix keyboard navigation focus styles.
**Includes:**

* Reintroduce `focus-visible` classes for keyboard users.
* Remove `outline-none` that hides focus.
* Ensure focus styles are visible, consistent, and accessible.
  **Use:** Improves usability for users navigating with a keyboard or assistive device.

---

### **6. `card-5-motion-reduce`**

**Purpose:** Respect users’ reduced motion preferences.
**Includes:**

* Reintroduce `motion-reduce:transition-none` for transitions and animations.
* Ensure hover/scale/transform effects do not trigger excessive motion for sensitive users.
  **Use:** Provides an accessible experience for users who prefer reduced motion or have motion sensitivity.

---
