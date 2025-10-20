import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="header-nav container mx-auto px-10 py-4 flex justify-between items-center"
        aria-label="Main Navigation"
      >
        <a
          href="/"
          className="header-logo text-2xl transition-colors duration-300"
          aria-label="Home: Web Accessibility Workshop"
        >
          <img
            src="/brevo_logo.svg"
            alt="Brevo Logo"
            style={{ display: "inline-block", verticalAlign: "middle", marginRight: "1rem" }}
          />
          Home
        </a>
        <div className="flex items-center">
          <ul className="flex space-x-6 mr-6">
            <li>
              <a
                href="/demo"
                className="transition-colors duration-300 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                aria-label="View interactive demos"
              >
                Demo
              </a>
            </li>
            <li>
              <a
                href="/exercises"
                className="transition-colors duration-300 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                aria-label="View examples and exercises"
              >
                Examples
              </a>
            </li>
            <li>
              <a
                href="/best-practices"
                className="transition-colors duration-300 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                aria-label="Learn accessibility best practices"
              >
                Best Practices
              </a>
            </li>
            <li>
              <a
                href="/references"
                className="transition-colors duration-300 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                aria-label="View reference materials"
              >
                Reference
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
