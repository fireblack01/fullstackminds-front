import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const DropDown = ({ label, name, defaultValue = '', required, options, disabled }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [['', 'Seleccione una opción', true], ...Object.entries(options)];
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <label htmlFor={name} className='my-3 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
      <span>{label}</span>
      <select
        required={required}
        name={name}
        className='shadow border border-gray-500 rounded w-full py-2 px-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline '
        value={selectedValue}
        disabled={disabled}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default DropDown;