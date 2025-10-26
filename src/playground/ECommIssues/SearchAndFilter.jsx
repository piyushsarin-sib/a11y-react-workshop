import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const filterOptions = [
    { type: "category", id: "hearing", name: "Hearing Assistance", group: "Categories" },
    { type: "category", id: "vision", name: "Visual Assistance", group: "Categories" },
    { type: "category", id: "mobility", name: "Mobility Aids", group: "Categories" },
    { type: "category", id: "sensory", name: "Sensory Tools", group: "Categories" },
    { type: "price", id: "under1000", name: "Under ₹1,000", group: "Price Ranges" },
    { type: "price", id: "1000-5000", name: "₹1,000 - ₹5,000", group: "Price Ranges" },
    { type: "price", id: "above5000", name: "Above ₹5,000", group: "Price Ranges" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleFilterToggle = (filter) => {
    let newFilters;
    const existingFilter = selectedFilters.find((f) => f.id === filter.id);

    if (existingFilter) {
      // Remove filter
      newFilters = selectedFilters.filter((f) => f.id !== filter.id);
    } else {
      // Add filter
      newFilters = [...selectedFilters, filter];
    }

    setSelectedFilters(newFilters);

    // Convert to old format for compatibility
    const categories = newFilters.filter((f) => f.type === "category").map((f) => f.id);
    const prices = newFilters.filter((f) => f.type === "price").map((f) => f.id);

    onFilterChange({
      categories: categories.length > 0 ? categories : ["all"],
      prices: prices.length > 0 ? prices : ["all"],
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilters([]);
    setIsDropdownOpen(false);
    onSearchChange("");
    onFilterChange({ categories: ["all"], prices: ["all"] });
  };

  const handleKeyDown = (e, filter) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFilterToggle(filter);
    }
  };

  const groupedOptions = filterOptions.reduce((acc, option) => {
    if (!acc[option.group]) {
      acc[option.group] = [];
    }
    acc[option.group].push(option);
    return acc;
  }, {});

  return (
    <div className="mb-8">
      <h2 id="search-filter-heading" className="sr-only">
        Search and Filter Options
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
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
              className="block w-full pl-12 pr-10 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-describedby="search-description"
            />
          </div>
          <div id="search-description" className="sr-only">
            Type to search for products by name or description
          </div>
        </div>

        {/* Multi-Select Filter Dropdown */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
          <label htmlFor="multi-filter-button" className="sr-only">
            Filter by category and price
          </label>
          <button
            id="multi-filter-button"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="block w-full px-3 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-left flex items-center justify-between"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            aria-label={`Filter options. ${selectedFilters.length} filters selected`}
          >
            <span className="truncate">Filters</span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto"
              role="listbox"
              aria-label="Filter options"
              aria-multiselectable="true"
            >
              {Object.entries(groupedOptions).map(([group, options]) => (
                <div key={group} className="py-2">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 flex items-center">
                    <span className="mr-2">{options[0].type === "category" ? "📦" : "💰"}</span>
                    {group}
                  </div>
                  {options.map((option) => {
                    const isSelected = selectedFilters.some((f) => f.id === option.id);
                    return (
                      <div
                        key={option.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`px-4 py-2.5 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-100 text-blue-900 font-medium"
                            : "hover:bg-gray-50 text-gray-900"
                        }`}
                        onClick={() => handleFilterToggle(option)}
                        onKeyDown={(e) => handleKeyDown(e, option)}
                        tabIndex={0}
                      >
                        <span className="text-sm">{option.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {(selectedFilters.length > 0 || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-sm text-gray-500">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              🔍 Search: {searchQuery}
              <button
                onClick={() => {
                  setSearchQuery("");
                  onSearchChange("");
                }}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none rounded-full hover:bg-blue-200"
                aria-label="Remove search filter"
              >
                ×
              </button>
            </span>
          )}

          {selectedFilters.map((filter) => (
            <span
              key={filter.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {filter.name}
              <button
                onClick={() => handleFilterToggle(filter)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 focus:outline-none rounded-full hover:bg-blue-200"
                aria-label={`Remove ${filter.name} filter`}
              >
                ×
              </button>
            </span>
          ))}

          {/* Clear All Button */}
          {(selectedFilters.length > 1 || (selectedFilters.length > 0 && searchQuery)) && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline focus:outline-none"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
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

