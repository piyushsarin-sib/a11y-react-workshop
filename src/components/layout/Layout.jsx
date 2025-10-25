import React from "react";
import PropTypes from "prop-types";
import Header from "../header";
import Footer from "../footer";

const Layout = ({ children, withLayout, showHeader, showFooter }) => {
    return (
      <>
        {/* Skip to main content link - first focusable element */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {showHeader && <Header />}
        <main 
          id="main-content"
          className={`${withLayout ? "flex flex-col items-center justify-center px-6 py-6 text-center" : ""}`}
          tabIndex={-1}
        >
          {children}
        </main>
        {showFooter && <Footer />}
      </>
    );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  withLayout: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
};

export default Layout;