import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Select = ({ data, onChange, defaultValue, width = "w-fit" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredItems =
    data?.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${width}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left border rounded-lg flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <span>{defaultValue || "Select item..."}</span>
        <FaChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {/* Search input at the top of dropdown */}
          <div className="sticky top-0 p-2 bg-white border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                autoFocus
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Dropdown items */}
          <div className="py-1">
            {filteredItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                className="w-full px-4 py-2 text-left hover:bg-orange-50 focus:bg-orange-50 focus:outline-none"
              >
                {item}
              </button>
            ))}
            {filteredItems.length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No items found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
