import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className='my-6 bg-blue-500 text-white font-bold text-lg py-3 px-3  rounded-xl hover:bg-opacity-80 shadow-md disabled:opacity-50 disabled:bg-gray-700 transition'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
