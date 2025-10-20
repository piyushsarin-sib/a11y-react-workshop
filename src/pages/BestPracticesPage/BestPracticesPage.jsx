import React from 'react';
import './BestPracticesPage.css';

const BestPracticesPage = () => {
  return (
    <div className="best-practices-page flex justify-center">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility Best Practices
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            A comprehensive guide to web accessibility best practices, tools, and guidelines 
            to help you build inclusive applications that work for everyone.
          </p>
        </header>

        {/* Overview Section */}
        <section className="mb-12" aria-labelledby="overview-section">
          <h2 id="overview-section" className="text-3xl font-bold text-gray-900 mb-6 text-center">Key Pillars of Accessibility</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="best-practice-card" aria-labelledby="best-practices-heading">
              <div className="icon-container best-practices" aria-hidden="true">
                <span className="text-2xl">✅</span>
              </div>
              <h3 id="best-practices-heading" className="text-xl font-semibold mb-3">Follow Best Practices</h3>
              <p>
                Use semantic HTML, proper focus management, alt text for images, controlled motion, 
                and reusable components. Incorporate accessibility from day 1 to the page level 
                in your development process.
              </p>
            </article>

            <article className="best-practice-card" aria-labelledby="tools-heading">
              <div className="icon-container tools" aria-hidden="true">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 id="tools-heading" className="text-xl font-semibold mb-3">Use Proper Tools</h3>
              <p>
                eslint-plugin-jsx-a11y, Lighthouse, Axe DevTools, browser extensions to catch 
                accessibility issues early in your development workflow.
              </p>
            </article>

            <article className="best-practice-card" aria-labelledby="guidelines-heading">
              <div className="icon-container guidelines" aria-hidden="true">
                <span className="text-2xl">📚</span>
              </div>
              <h3 id="guidelines-heading" className="text-xl font-semibold mb-3">Follow Guidelines</h3>
              <p>
                Adhere to WCAG, ARIA patterns (Don't use ARIA everywhere), and enterprise 
                accessibility standards for consistent, accessible experiences.
              </p>
            </article>
          </div>
        </section>

        {/* Testing Methods */}
        <section className="mb-12" aria-labelledby="testing-methods">
          <h2 id="testing-methods" className="text-3xl font-bold text-gray-900 mb-6 text-center">Manual Testing Methods</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="testing-method">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">⌨️</span>
                {" "}
                Keyboard-only Navigation
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tab Test - Navigate using only Tab and Shift+Tab</li>
                <li>Use "No Mouse Days" browser extensions</li>
                <li>Test all interactive elements are reachable</li>
                <li>Verify focus indicators are visible</li>
              </ul>
            </article>

            <article className="testing-method">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">🔊</span>
                {" "}
                Screen Reader Testing
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>NVDA</strong> - Free screen reader for Windows</li>
                <li><strong>VoiceOver</strong> - Built-in macOS/iOS screen reader</li>
                <li><strong>ChromeVox</strong> - Chrome extension for testing</li>
                <li>Test content structure and navigation</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-12" aria-labelledby="core-principles">
          <h2 id="core-principles" className="text-3xl font-bold text-gray-900 mb-6 text-center">Core Accessibility Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Semantic HTML</h3>
              <p>Use proper HTML elements for their intended purpose. Headers, lists, buttons, and links provide meaning to assistive technologies.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Alt Text</h3>
              <p>Provide descriptive alternative text for images. Decorative images should have empty alt attributes (alt="").</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Keyboard Navigation</h3>
              <p>Ensure all interactive elements are keyboard accessible. Implement proper focus management and skip links.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">ARIA Roles</h3>
              <p>Use ARIA attributes sparingly and correctly. Don't override semantic HTML with unnecessary ARIA.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Color & Contrast</h3>
              <p>Maintain minimum contrast ratios (4.5:1 for normal text, 3:1 for large text). Don't rely on color alone to convey information.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Motion & Animation</h3>
              <p>Respect prefers-reduced-motion settings. Provide controls to pause, stop, or hide moving content.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Forms & Inputs</h3>
              <p>Associate labels with form controls. Provide clear error messages and validation feedback.</p>
            </article>

            <article className="principle-card">
              <h3 className="text-xl font-semibold mb-2">Focus Management</h3>
              <p>Implement visible focus indicators. Manage focus in dynamic content like modals and single-page applications.</p>
            </article>
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-12" aria-labelledby="recommended-tools">
          <h2 id="recommended-tools" className="text-3xl font-bold text-gray-900 mb-6">Recommended Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 id="development-tools" className="text-xl font-semibold mb-4">Development Tools</h3>
              <ul className="space-y-3" aria-labelledby="development-tools">
                <li className="tool-item">
                  <strong>eslint-plugin-jsx-a11y</strong>
                  <p className="text-gray-800">Catch accessibility issues in JSX during development</p>
                </li>
                <li className="tool-item">
                  <strong>Lighthouse</strong>
                  <p className="text-gray-800">Built-in Chrome DevTools accessibility audit</p>
                </li>
                <li className="tool-item">
                  <strong>Axe DevTools</strong>
                  <p className="text-gray-800">Browser extension for comprehensive accessibility testing</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 id="testing-extensions" className="text-xl font-semibold mb-4">Testing Extensions</h3>
              <ul className="space-y-3" aria-labelledby="testing-extensions">
                <li className="tool-item">
                  <strong>WAVE</strong>
                  <p className="text-gray-800">Web Accessibility Evaluation Tool</p>
                </li>
                <li className="tool-item">
                  <strong>No Mouse Days</strong>
                  <p className="text-gray-800">Hide cursor to test keyboard navigation</p>
                </li>
                <li className="tool-item">
                  <strong>Color Oracle</strong>
                  <p className="text-gray-800">Color blindness simulator</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section aria-labelledby="guidelines-section">
          <h2 id="guidelines-section" className="text-3xl font-bold text-gray-900 mb-6">Standards & Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="guideline-card">
              <h3 className="text-lg font-semibold mb-3">WCAG 2.1</h3>
              <p>Web Content Accessibility Guidelines provide the foundation for web accessibility standards worldwide.</p>
              <ul className="mt-3 text-sm space-y-1" aria-label="WCAG compliance levels">
                <li>• Level A (minimum)</li>
                <li>• Level AA (standard)</li>
                <li>• Level AAA (enhanced)</li>
              </ul>
            </article>

            <article className="guideline-card">
              <h3 className="text-lg font-semibold mb-3">ARIA Authoring Practices</h3>
              <p>Design patterns and widgets that demonstrate how to make complex UI components accessible.</p>
              <ul className="mt-3 text-sm space-y-1" aria-label="ARIA topics">
                <li>• Widget patterns</li>
                <li>• Keyboard interaction</li>
                <li>• ARIA roles & properties</li>
              </ul>
            </article>

            <article className="guideline-card">
              <h3 className="text-lg font-semibold mb-3">Section 508</h3>
              <p>US federal accessibility requirements for government agencies and contractors.</p>
              <ul className="mt-3 text-sm space-y-1" aria-label="Section 508 requirements">
                <li>• Federal compliance</li>
                <li>• Enterprise standards</li>
                <li>• Legal requirements</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BestPracticesPage;