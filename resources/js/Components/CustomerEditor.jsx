import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';
import InputError from './InputError';
import CustomerDelete from './CustomerDelete';

const CustomerEditor = ({
  id,
  itemValues,
  onChange,
  onSubmit,
  isEditable,
  errors,
  processing,
  isUpdate,
}) => {
  const defaultDate = new Date('1990/1/1');
  registerLocale('ja', ja);

  return (
    <form action="" method="post" onSubmit={onSubmit}>
      <div className="container px-5 py-10 mx-auto">
        <div className="mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  顧客名
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
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
                <label htmlFor="kana" className="leading-7 text-sm text-gray-600">
                  フリガナ
                </label>
                <input
                  type="text"
                  id="kana"
                  name="kana"
                  value={itemValues.kana}
                  disabled={!isEditable}
                  onChange={onChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                />
                {errors.kana && <InputError message={errors.kana} />}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="tel" className="leading-7 text-sm text-gray-600">
                  電話番号
                </label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  value={itemValues.tel}
                  onChange={onChange}
                  disabled={!isEditable}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                />
                {errors.tel && <InputError message={errors.tel} />}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={itemValues.email}
                  disabled={!isEditable}
                  onChange={onChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                />
                {errors.email && <InputError message={errors.email} />}
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="tel" className="leading-7 text-sm text-gray-600 block">
                  性別
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="man"
                  value="0"
                  onChange={onChange}
                  disabled={!isEditable}
                  className=" bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  checked={itemValues.gender == 0 ? true : false}
                />
                <label htmlFor="man" className="leading-7 text-sm text-gray-600 mx-4">
                  男性
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="1"
                  onChange={onChange}
                  disabled={!isEditable}
                  className=" bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  checked={itemValues.gender == 1 ? true : false}
                />
                <label htmlFor="female" className="leading-7 text-sm text-gray-600">
                  女性
                </label>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="birthday" className="leading-7 text-sm text-gray-600">
                  誕生日
                </label>

                <DatePicker
                  name="birthday"
                  id="birthday"
                  selected={itemValues.birthday && new Date(itemValues.birthday)}
                  dateFormat="yyyy/MM/dd"
                  placeholderText={defaultDate.toLocaleDateString()}
                  maxDate={new Date()}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  onChange={(selectedDate) => {
                    onChange({ target: { id: 'birthday', value: selectedDate || defaultDate } });
                  }}
                />
                {errors.birthday && <InputError message={errors.birthday} />}
              </div>
            </div>

            <div className="p-2 w-1/4">
              <div className="relative">
                <label htmlFor="postcode" className="leading-7 text-sm text-gray-600">
                  郵便番号
                </label>
                <input
                  type="text"
                  id="postcode"
                  maxLength="8"
                  name="postcode"
                  value={itemValues.postcode}
                  disabled={!isEditable}
                  onChange={onChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                />
                {errors.postcode && <InputError message={errors.postcode} />}
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                  住所
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={itemValues.address}
                  disabled={!isEditable}
                  onChange={onChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                />
                {errors.address && <InputError message={errors.address} />}
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="memo" className="leading-7 text-sm text-gray-600">
                  MEMO
                </label>
                <textarea
                  type="text"
                  id="memo"
                  name="memo"
                  value={itemValues.memo}
                  disabled={!isEditable}
                  onChange={onChange}
                  rows={8}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                ></textarea>
                {errors.memo && <InputError message={errors.memo} />}
              </div>
            </div>

            {isEditable && (
              <div className="p-2 w-full flex ">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-block mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  {isUpdate ? '更新' : '作成'}
                </button>

                {isUpdate && <CustomerDelete processing={processing} id={id} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CustomerEditor;
