import React from 'react';

const CustomerSearchForm = ({ value, onChange, onClick }) => {
  return (
    <div>
      <input type="text" name="search" id="search" value={value} onChange={onChange} />

      <button type="button" className="bg-blue-300 text-white py-2 px-2" onClick={onClick}>
        検索
      </button>
    </div>
  );
};

export default CustomerSearchForm;
