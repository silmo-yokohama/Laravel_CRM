import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index(props) {
  const { auth, items } = props;
  console.log(items);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">商品一覧</h2>}
    >
      <Head title="商品一覧" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-5">
                    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                      <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Learn More
                      </a>

                      <Link
                        href={route('items.create')}
                        as="button"
                        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                      >
                        商品追加
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                            ID
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Name
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Price
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Updated
                          </th>
                          <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                            Activate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items &&
                          items.map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-3">{item.id}</td>
                              <td className="px-4 py-3">
                                <Link href={route('items.show', { item: item.id })}>
                                  {item.name}
                                </Link>
                              </td>
                              <td className="px-4 py-3">{'￥' + item.price.toLocaleString()}</td>
                              <td className="px-4 py-3 text-lg text-gray-900">{item.updated_at}</td>
                              <td className="w-10 text-center">
                                {item.is_selling === 1 ? (
                                  <span className="text-green-700">販売中</span>
                                ) : (
                                  <span className="text-red-800">停止中</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
