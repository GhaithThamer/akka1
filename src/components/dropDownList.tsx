"use client";

import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedValue: string) => void;
  defaultLabel?: string;
  disabled?: boolean;
}

const DropDownList: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultLabel = "Select an option",
  disabled = false,
}) => {
  const defaultValue =
    options.find((option) => option.label === defaultLabel)?.value ?? "";
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
    console.log("Selected value:", value);
  };


  return (
    <div>
      <select
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className={
          "dropdown-select border border-gray-300 rounded p-2" +
          (selectedValue === defaultValue
            ? " text-green-500 "
            : " text-yellow-500 ")
        }
      >
        <option value="" disabled>
          {defaultLabel}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={
              option.label === defaultLabel ? "text-green-500" : "text-black"
            }
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownList;
