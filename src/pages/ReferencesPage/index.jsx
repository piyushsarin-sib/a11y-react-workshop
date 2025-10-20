import React from 'react';
import './ReferencesPage.css';

const ReferencesPage = () => {
  return (
    <div className="references-page">
      <div className="container mx-auto px-4 py-8" id="main-content">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility References
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Essential resources, documentation, and tools for web accessibility development.
          </p>
        </header>

        {/* Official Guidelines */}
        <section className="mb-12" aria-labelledby="guidelines-heading">
          <h2 id="guidelines-heading" className="text-3xl font-bold text-gray-900 mb-6">Official Guidelines & Standards</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">WCAG 2.1 Guidelines</h3>
              <p className="text-gray-700 mb-4">
                Web Content Accessibility Guidelines - the international standard for web accessibility.
              </p>
              <a 
                href="https://www.w3.org/WAI/WCAG21/quickref/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="View WCAG Quick Reference (opens in new tab)"
              >
                View WCAG Quick Reference →
              </a>
            </article>

            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">ARIA Authoring Practices</h3>
              <p className="text-gray-700 mb-4">
                Design patterns and widgets that demonstrate accessible rich internet applications.
              </p>
              <a 
                href="https://www.w3.org/WAI/ARIA/apg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="View ARIA Patterns (opens in new tab)"
              >
                View ARIA Patterns →
              </a>
            </article>

            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">Section 508</h3>
              <p className="text-gray-700 mb-4">
                US federal accessibility requirements for government agencies and contractors.
              </p>
              <a 
                href="https://www.section508.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="Visit Section 508 website (opens in new tab)"
              >
                Visit Section 508 →
              </a>
            </article>

            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">Web Accessibility Initiative (WAI)</h3>
              <p className="text-gray-700 mb-4">
                W3C's initiative for web accessibility standards and resources.
              </p>
              <a 
                href="https://www.w3.org/WAI/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="Explore WAI Resources (opens in new tab)"
              >
                Explore WAI Resources →
              </a>
            </article>
          </div>
        </section>

        {/* Reusable Package References - NEW SECTION */}
        <section className="mb-12" aria-labelledby="packages-heading">
          <h2 id="packages-heading" className="text-3xl font-bold text-gray-900 mb-6">Reusable Package References</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">React Aria Collections & Interactions</h3>
              <p className="text-gray-700 mb-4">
                Adobe's React Aria documentation for building accessible collection components and handling interactions.
              </p>
              <div className="space-y-2">
                <a 
                  href="https://react-spectrum.adobe.com/react-aria/collections.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                  aria-label="View React Aria Collections documentation (opens in new tab)"
                >
                  Collections Documentation →
                </a>
                <a 
                  href="https://react-spectrum.adobe.com/react-aria/interactions.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                  aria-label="View React Aria Interactions documentation (opens in new tab)"
                >
                  Interactions Documentation →
                </a>
              </div>
            </article>

            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">React Aria GitHub Repositories</h3>
              <p className="text-gray-700 mb-4">
                Source code and implementation details for React Aria packages.
              </p>
              <div className="space-y-2">
                <a 
                  href="https://github.com/adobe/react-spectrum/tree/main/packages/%40react-aria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                  aria-label="View React Aria main repository (opens in new tab)"
                >
                  React Aria Repository →
                </a>
                <a 
                  href="https://github.com/adobe/react-spectrum/tree/main/packages/%40react-aria/collections" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                  aria-label="View React Aria Collections repository (opens in new tab)"
                >
                  Collections Package Repository →
                </a>
              </div>
            </article>

            <article className="reference-card">
              <h3 className="text-xl font-semibold mb-3">ActiveDescendant Keyboard Navigation</h3>
              <p className="text-gray-700 mb-4">
                Detailed guide on implementing aria-activedescendant for keyboard navigation in complex widgets.
              </p>
              <a 
                href="https://sarahmhigley.com/writing/activedescendant/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="Read ActiveDescendant guide by Sarah Higley (opens in new tab)"
              >
                Read ActiveDescendant Guide →
              </a>
            </article>
          </div>
        </section>

        {/* Testing Tools */}
        <section className="mb-12" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-3xl font-bold text-gray-900 mb-6">Testing Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="tool-card">
              <h3 className="text-lg font-semibold mb-3">Axe DevTools</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Browser extension for automated accessibility testing.
              </p>
              <a 
                href="https://www.deque.com/axe/devtools/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="Download Axe DevTools extension (opens in new tab)"
              >
                Download Extension →
              </a>
            </article>

            {/* More tool cards with same pattern... */}
          </div>
        </section>

        {/* Development Resources */}
        <section className="mb-12" aria-labelledby="dev-resources-heading">
          <h2 id="dev-resources-heading" className="text-3xl font-bold text-gray-900 mb-6">Development Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="resource-category">
              <h3 id="react-resources" className="text-xl font-semibold mb-4">React Accessibility</h3>
              <ul className="space-y-3" aria-labelledby="react-resources">
                <li>
                  <a 
                    href="https://reactjs.org/docs/accessibility.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                    aria-label="React Accessibility Documentation (opens in new tab)"
                  >
                    React Accessibility Documentation
                  </a>
                </li>
                {/* More list items... */}
              </ul>
            </div>

            <div className="resource-category">
              <h3 id="screen-readers" className="text-xl font-semibold mb-4">Screen Readers</h3>
              <ul className="space-y-3" aria-labelledby="screen-readers">
                <li>
                  <a 
                    href="https://www.nvaccess.org/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                    aria-label="Download NVDA Free Windows Screen Reader (opens in new tab)"
                  >
                    NVDA (Free Windows Screen Reader)
                  </a>
                </li>
                {/* More list items... */}
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Resources */}
        <section className="mb-12" aria-labelledby="learning-heading">
          <h2 id="learning-heading" className="text-3xl font-bold text-gray-900 mb-6">Learning Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="learning-card">
              <h3 className="text-lg font-semibold mb-3">WebAIM</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Comprehensive accessibility training and resources.
              </p>
              <a 
                href="https://webaim.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="Visit WebAIM website (opens in new tab)"
              >
                Visit WebAIM →
              </a>
            </article>
            {/* More learning cards... */}
          </div>
        </section>

        {/* Quick Checklists */}
        <section aria-labelledby="checklists-heading">
          <h2 id="checklists-heading" className="text-3xl font-bold text-gray-900 mb-6">Quick Reference Checklists</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="checklist-card">
              <h3 id="wcag-checklist" className="text-xl font-semibold mb-4">WCAG 2.1 AA Checklist</h3>
              <ul className="space-y-2 text-sm" aria-labelledby="wcag-checklist">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span>Images have appropriate alt text</span>
                </li>
                {/* More checklist items... */}
              </ul>
              <a 
                href="https://webaim.org/standards/wcag/checklist" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5"
                aria-label="View full WCAG checklist (opens in new tab)"
              >
                View Full Checklist →
              </a>
            </div>
            {/* More checklist cards... */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReferencesPage;
