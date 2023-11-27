import React from 'react';
import InputError from './InputError';

const ItemsEditor = ({ itemValues, onChange, onSubmit, isEditable, errors, processing }) => {
  errors = errors || {};
  return (
    <div>
      <form action="" method="post" onSubmit={isEditable && onSubmit}>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    商品名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={itemValues.name}
                    onChange={onChange}
                    disabled={!isEditable}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  />
                  {errors.name && <InputError message={errors.name} />}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="price" className="leading-7 text-sm text-gray-600">
                    値段
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={itemValues.price}
                    disabled={!isEditable}
                    onChange={onChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  />
                  {errors.price && <InputError message={errors.price} />}
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="memo" className="leading-7 text-sm text-gray-600">
                    Memo
                  </label>
                  <textarea
                    id="memo"
                    name="memo"
                    onChange={onChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                    disabled={!isEditable}
                    value={itemValues.memo}
                  ></textarea>
                  {errors.memo && <InputError message={errors.memo} />}
                </div>
              </div>

              {isEditable && (
                <div className="p-2 w-full">
                  <button
                    disabled={processing}
                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    Button
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemsEditor;
