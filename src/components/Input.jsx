import React from 'react';

const Input = ({ label, name, defaultValue, type, required, disabled }) => {
  return (
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label htmlFor={name} className='my-3 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
        <span>{label}</span>
        <input
          required={required}
          type={type}
          name={name}
          className='shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default Input;