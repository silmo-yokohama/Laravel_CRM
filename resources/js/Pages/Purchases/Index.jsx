import PurchasePaginations from '@/Components/PurchasePaginate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { dateTimeToString } from '@/common/dateToString';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const Index = (props) => {
  const { auth, orders } = props;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">商品一覧</h2>}
    >
      <Head title="顧客一覧" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                  <div className="flex flex-col text-center w-full mb-5">
                    <div className="flex pl-4 mt-4  w-full mx-auto">
                      <Link
                        href={route('purchases.create')}
                        as="button"
                        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                      >
                        顧客追加
                      </Link>
                    </div>
                  </div>

                  <div className="w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                            ID
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            顧客名
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            購入金額
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            ステータス
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            購入日時
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders &&
                          orders.data &&
                          orders.data.map((item, index) => {
                            const dateString = dateTimeToString(new Date(item.created_at));
                            const totalPrice = '￥ ' + Number(item.total).toLocaleString();
                            const status = item.is_cancelled ? 'キャンセル' : '購入済み';

                            return (
                              <tr key={index}>
                                <td className="px-4 py-3">{item.id}</td>
                                <td className="px-4 py-3">
                                  <Link href={route('purchases.edit', { purchase: item.id })}>
                                    {item.customer_name}
                                  </Link>
                                </td>
                                <td className="px-4 py-3">{totalPrice}</td>
                                <td className="px-4 py-3">{status}</td>
                                <td className="px-4 py-3">{dateString}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                  <PurchasePaginations links={orders.links} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
