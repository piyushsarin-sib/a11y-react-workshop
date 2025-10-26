### **1. `edge-case-0-issue-list`**

**Purpose:** Serve as a baseline “broken” version of the accessibility workshop demo, highlighting existing issues.
**Includes:**

* Missing proper heading hierarchy.
* No skip link to main content for keyboard users.
* No live region to announce cart updates.
* Focus management not enforced in modal.
* Interactive elements may lack proper ARIA labels.

**Use:** Reference point for all accessibility fixes in subsequent edge-case tags.

---

### **2. `edge-case-1-heading-hierarchy`**

**Purpose:** Fix and enforce proper heading structure.
**Includes:**

* `<h1>` for main page title.
* `<h2>` for individual product sections.
* `<h3>` for modal/cart headings.
* Ensure logical progression of headings for screen readers.

**Use:** Improves semantic clarity, screen reader navigation, and overall accessibility.

---

### **3. `edge-case-2-skip-link`**

**Purpose:** Add skip link to allow keyboard users to jump directly to main content.
**Includes:**

* `<a>` element with `href="#mainContent"` positioned at the top of the page.
* Focus styles visible when tabbing via keyboard.
* Correct handling of focus when skip link is activated.

**Use:** Provides keyboard users a quick way to bypass repetitive navigation and access main content efficiently.

---

### **4. `edge-case-3-live-region`**

**Purpose:** Announce dynamic updates (like cart changes) for screen reader users.
**Includes:**

* A visually hidden `<div>` with `aria-live="polite"` and `aria-atomic="true"`.
* Updates text content dynamically when `cartCount` changes.
* Ensures assistive technologies announce cart additions or removals.

**Use:** Keeps users informed of changes without visual reliance, improving accessibility for screen reader users.
