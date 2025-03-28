import React, { useState } from 'react';
import './BoatifyPicklist.scss';

type Option = {
  label: string;
  value: string;
};

type BoatifyPicklistProps = {
  id?: string;
  label: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  variant?: 'dark' | 'light';
};

const BoatifyPicklist = ({
  id,
  label,
  options,
  placeholder = 'Select an option',
  value,
  onChange,
  variant = 'light',
}: BoatifyPicklistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="picklist">
      {id ? (
        <label
          htmlFor={id}
          className={`picklist__label ${
            variant === 'dark' ? 'picklist__label--dark' : ''
          }`}
        >
          {label}
        </label>
      ) : (
        <span
          className={`picklist__label ${
            variant === 'dark' ? 'picklist__label--dark' : ''
          }`}
        >
          {label}
        </span>
      )}
      <div
        className={`picklist__field ${
          variant === 'dark' ? 'picklist__field--dark' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
      </div>
      {isOpen && (
        <ul className="picklist__dropdown">
          {options.map((option) => (
            <li
              key={option.value}
              className="picklist__option"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoatifyPicklist;