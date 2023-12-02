import React from 'react';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { dateToString } from '@/common/dateToString';
import PurchaseDelete from '../PurchaseDelete';

const PurchaseEditor = (props) => {
  const { id, form, customers, items, isEditable, isUpdate, onSubmit, errors } = props;
  const customerOption = customers.map((customer) => {
    return {
      value: customer.id,
      label: customer.name + '[' + customer.kana + ']',
    };
  });

  const todayText = dateToString();
  const totalPrice = (() => {
    let totalPrice = 0;

    items.map((item) => {
      const target = form.data.items.find((v) => item.id === v.id);
      totalPrice += item.price * target.value;
    });
    return totalPrice;
  })();

  registerLocale('ja', ja);
  return (
    <form action="" method="post" onSubmit={onSubmit}>
      <div className="container px-5 py-10 mx-auto">
        <div className="mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-2/3">
              <div className="relative">
                <label htmlFor="customer" className="leading-7 text-sm text-gray-600">
                  顧客選択
                </label>

                <Select
                  name="customer"
                  id="customer"
                  options={customerOption}
                  defaultValue={
                    customerOption.length === 1
                      ? {
                          id: customerOption[0].id,
                          label: customerOption[0].label,
                        }
                      : {}
                  }
                  isDisabled={customerOption.length === 1}
                  onChange={(item) => {
                    form.setData('customer_id', item.value);
                  }}
                />
              </div>
            </div>
            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="date" className="leading-7 text-sm text-gray-600">
                  日付
                </label>
                <DatePicker
                  name="date"
                  id="date"
                  selected={new Date(form.data.purchase_date)}
                  dateFormat="yyyy/MM/dd"
                  maxDate={new Date()}
                  placeholderText={todayText}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                  onChange={(selectedDate) => {
                    form.setData('purchase_date', dateToString(selectedDate));
                  }}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="date" className="leading-7 text-sm text-gray-600">
                  商品選択
                </label>
                <div className=" w-full mx-auto overflow-auto">
                  <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                      <tr>
                        <th className="w-1/12 pl-4 px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                          ID
                        </th>
                        <th className="w-4/12 pl-4 text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                          商品名
                        </th>
                        <th className="w-3/12 pl-4 text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                          単価
                        </th>
                        <th className="w-2/12 pl-4 text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                          購入個数
                        </th>
                        <th className="w-2/12 pl-4 text-center px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                          小計
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items &&
                        items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className={`w-1/12 pl-4 ${index !== 0 ? 'border-t ' : ''}`}>
                                {item.id}
                              </td>
                              <td className={`w-4/12 pl-4 ${index !== 0 ? 'border-t ' : ''}`}>
                                {item.name}
                              </td>
                              <td className={`w-3/12 pl-4 ${index !== 0 ? 'border-t ' : ''}`}>
                                {'￥' + item.price.toLocaleString()}
                              </td>
                              <td
                                className={`w-2/12 text-center ${index !== 0 ? 'border-t ' : ''}`}
                              >
                                <input
                                  type="number"
                                  value={form.data.items.find((v) => v.id === item.id).value}
                                  className="text-right w-16 border-1 border-gray-200 py-1 my-1"
                                  onChange={({ target }) => {
                                    if (target.value < 0 || target.value > 10) return;

                                    const itemData = form.data.items.find(
                                      (data) => item.id === data.id
                                    );
                                    const otherData = form.data.items.filter(
                                      (data) => item.id !== data.id
                                    );

                                    itemData.value = Number(target.value);

                                    form.setData('items', [...otherData, itemData]);
                                  }}
                                />
                              </td>
                              <td className={`w-2/12 text-right ${index !== 0 ? 'border-t ' : ''}`}>
                                {'￥' +
                                  (
                                    item.price * form.data.items.find((v) => item.id === v.id).value
                                  ).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t my-6 pt-6 text-right text-2xl">
                ￥{totalPrice.toLocaleString()}
              </div>

              {isEditable && (
                <div className="p-2 w-full flex ">
                  <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-block mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    {isUpdate ? '更新' : '作成'}
                  </button>

                  {isUpdate && <PurchaseDelete processing={form.processing} id={id} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PurchaseEditor;
