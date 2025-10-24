import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import FilterMenu from "./FilterMenu";
import { usePopup, ARIA_HASPOPUP } from "@lib/Overlay";

// Categories derived from the product list for filtering
const categories = [
  { id: "hearing", name: "Hearing Assistance" },
  { id: "vision", name: "Visual Assistance" },
  { id: "mobility", name: "Mobility Aids" },
  { id: "sensory", name: "Sensory Tools" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "under1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "above5000", name: "Above ₹5,000" },
];

const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const searchInputRef = useRef(null);

  const popupControls = usePopup({
    bodyId: "filter-menu-overlay",
    triggerId: "filter-menu-trigger",
    hasPopup: ARIA_HASPOPUP.MENU,
  });

  // Price range IDs for checking
  const priceIds = ["under1000", "1000-5000", "above5000"];

  const handleMenuChange = (event, { selectedKeys }) => {
    const selectedArray = Array.from(selectedKeys);

    // Separate the selected keys into categories and prices
    const selectedCategoryIds = categories.map((c) => c.id);

    // Filter out categories and prices from selectedKeys
    const newCategories = selectedArray.filter((key) => selectedCategoryIds.includes(key));
    const newPrices = selectedArray.filter((key) => priceIds.includes(key));

    // Update state
    setSelectedCategories(newCategories);
    setSelectedPrices(newPrices);
    onFilterChange({ categories: newCategories, prices: newPrices });

    // Don't close menu in multiple selection mode - let user select multiple items
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Debounce search to prevent excessive filtering while typing
    const timeoutId = setTimeout(() => {
      onSearchChange(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPrices([]);
    onSearchChange("");
    onFilterChange({ categories: [], prices: [] });

    // Focus back on search input for better keyboard navigation
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="mb-8">
      <h3 id="search-filter-heading" className="sr-only">
        Search and Filter Options
      </h3>

      {/* Main search and filter container */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input with accessible label */}
        <div className="relative flex-grow">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span
              className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="search"
              id="product-search"
              name="product-search"
              className="block w-full pl-12 pr-10 py-3 border border-gray-300 rounded-md shadow-sm accessible-input accessible-focus"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearchChange}
              ref={searchInputRef}
              aria-describedby="search-description"
            />
            {searchQuery && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            )}
          </div>
          <div id="search-description" className="sr-only">
            Type to search for products by name or description
          </div>
        </div>

        {/* Filter dropdown button */}
        <button
          type="button"
          {...popupControls.trigger}
          onClick={popupControls.toggle}
          className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 accessible-focus"
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <FilterMenu
          popupControls={popupControls}
          onChange={handleMenuChange}
          categories={categories}
          priceRanges={priceRanges}
          selectedKeys={[...selectedCategories, ...selectedPrices]}
        />

        {/* Clear search button - only show when there is text */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearFilters}
            className="md:hidden px-4 py-2 bg-gray-100 text-gray-900 rounded-md text-sm hover:bg-gray-200 accessible-focus font-medium"
            aria-label="Clear search and filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Active filters display */}
      {(selectedCategories.length > 0 || selectedPrices.length > 0 || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-sm text-gray-700">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
              Search: {searchQuery}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  onSearchChange("");
                }}
                className="ml-1 inline-flex text-blue-700 accessible-focus"
                aria-label={`Remove search filter: ${searchQuery}`}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </span>
          )}

          {selectedCategories
            .filter((c) => c !== "all-cat")
            .map((catId) => (
              <span
                key={catId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900"
              >
                Category: {categories.find((c) => c.id === catId)?.name}
                <button
                  type="button"
                  onClick={() => {
                    const newCategories = selectedCategories.filter((c) => c !== catId);
                    const categoriesToSet = newCategories.length > 0 ? newCategories : ["all-cat"];
                    setSelectedCategories(categoriesToSet);
                    onFilterChange({ categories: categoriesToSet, prices: selectedPrices });
                  }}
                  className="ml-1 inline-flex text-blue-700 accessible-focus"
                  aria-label={`Remove category filter: ${
                    categories.find((c) => c.id === catId)?.name
                  }`}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </span>
            ))}

          {selectedPrices
            .filter((p) => p !== "all-prices")
            .map((priceId) => (
              <span
                key={priceId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900"
              >
                Price: {priceRanges.find((p) => p.id === priceId)?.name}
                <button
                  type="button"
                  onClick={() => {
                    const newPrices = selectedPrices.filter((p) => p !== priceId);
                    const pricesToSet = newPrices.length > 0 ? newPrices : ["all-prices"];
                    setSelectedPrices(pricesToSet);
                    onFilterChange({ categories: selectedCategories, prices: pricesToSet });
                  }}
                  className="ml-1 inline-flex text-blue-700 accessible-focus"
                  aria-label={`Remove price filter: ${
                    priceRanges.find((p) => p.id === priceId)?.name
                  }`}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </span>
            ))}

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-blue-700 hover:text-blue-900 accessible-focus ml-auto font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchAndFilter;
