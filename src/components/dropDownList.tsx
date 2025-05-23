"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedValue: string) => void;
  defaultOption?: Option;
  disabled?: boolean;
}

const DropDownList: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultOption = { value: "selectAnOption", label: "Select an option" },
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultOption.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
    console.log("Selected value:", value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`
          dropdown-select border border-gray-300 rounded p-2 cursor-pointer
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${selectedValue === defaultOption.value ? "text-green-500" : "text-yellow-500"}
        `}
      >
        {selectedOption?.label || defaultOption.label}
        <span className="float-right">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`
                p-2 hover:bg-gray-100 cursor-pointer
                ${
                  option.value === selectedValue
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }
                ${option.value === defaultOption.value ? "text-green-500" : ""}
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
