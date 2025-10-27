import React from "react";

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus on skip link or first focusable element
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.focus();
    }
  };

  return (
    <footer
      className="py-10 rounded-t-3xl mt-auto"
      role="contentinfo"
      style={{ backgroundColor: "var(--brand-forest-green-800)", minHeight: "120px" }}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Back to top link */}
        <a 
          href="#top" 
          onClick={scrollToTop}
          className="inline-block mb-4 text-white underline hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded px-2 py-1 transition-none"
          style={{ color: "#ffffff" }}
          aria-label="Back to top of page"
        >
          ↑ Back to Top
        </a>
        
        {/* Copyright */}
        <p className="text-sm" style={{ color: "#ffffff" }}>
          &copy; Brevo 2025 | Web Accessibility Workshop at React India by Brevo
        </p>
        <p className="text-xs mt-2" style={{ color: "#ffffff" }}>
          All Rights Reserved by Brevo
        </p>
      </div>
    </footer>
  );
};

export default Footer;