import React from "react";
import { Link } from "react-router-dom";

export default function ExercisesPage() {
  const demoLinks = [
    {
      to: "/playground/e-commerce",
      title: "Inaccessible eCommerce",
      desc: "E-commerce page with accessibility issues to fix",
    },
    {
      to: "/playground/card-wrapper",
      title: "Card Accessibility",
      desc: "Enhanced card components with proper accessibility",
    },
    {
      to: "/playground/product-grid",
      title: "Product Grid Accessibility",
      desc: "Improved product grid layout with accessibility in mind",
    },
    {
      to: "/playground/grid-active-descendant",
      title: "Grid keyboard navigation with active descendant",
      desc: "Simple grid layout with active descendant demo",
    },
    {
      to: "/playground/filter-menu",
      title: "Filter Menu Accessibility (popup/overlay + trigger connectivity with accessibility)",
      desc: "Improved filter menu with accessibility in mind",
    },
    {
      to: "/playground/cart-modal",
      title: "Modal (powered by Overlay) with accessibility (focus trap)",
      desc: "Improved Overlay modal usecase with focus trap",
    },
    {
      to: "/playground/filter-combo",
      title: "A popup multi-select listbox + active aria descendant ???",
      desc: "Combobox variant & accessibility considerations.",
    },
    {
      to: "/playground/edge-cases",
      title: "Edge Cases Accessibility",
      desc: "Improved handling of edge cases with accessibility in mind",
    },
    {
      to: "/solved/e-commerce",
      title: "Completely Accessible eCommerce",
      desc: "E-commerce page fully accessible",
    },
  ];

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Hands-On Accessibility Exercises
        </h1>
        <p className="text-lg text-gray-700 mt-4 text-center max-w-3xl">
          Practice fixing accessibility issues with these interactive examples
        </p>
      </header>
      <ul className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full list-none p-0">
        {demoLinks.map((demo) => (
          <li key={demo.to}>
            <Link
              to={demo.to}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 border-2 border-transparent transition-all block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`${demo.title}: ${demo.desc}`}
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {demo.title}
              </h2>
              <p className="mt-2 text-gray-700">{demo.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
