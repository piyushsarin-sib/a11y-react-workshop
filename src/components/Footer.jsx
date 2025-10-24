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
      className="bg-gray-800 text-white py-10 rounded-t-3xl mt-auto"
      role="contentinfo"
      style={{ backgroundColor: "var(--brand-forest-green-950)", minHeight: "120px" }}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Back to top link */}
        <a 
          href="#top" 
          onClick={scrollToTop}
          className="inline-block mb-4 text-white underline hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1 transition-none"
          aria-label="Back to top of page"
        >
          ↑ Back to Top
        </a>
        
        {/* Copyright */}
        <p className="text-sm text-gray-300">
          &copy; Brevo 2025 | Web Accessibility Workshop at React India by Brevo
        </p>
        <p className="text-xs text-gray-400 mt-2">
          All Rights Reserved by Brevo
        </p>
      </div>
    </footer>
  );
};

export default Footer;