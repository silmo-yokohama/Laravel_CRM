import CustomerPaginations from '@/Components/CustomerPaginations';
import CustomerSearchForm from '@/Components/CustomerSearchForm';
import FlashMessage from '@/Components/Forms/Labels/FlashMessage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index(props) {
  const { auth, customers } = props;
  const form = useForm({});
  const setSearchText = (e) => {
    form.setData('search', e.target.value);
  };
  const searchCustomer = () => {
    form.get(route('customers.index', { search: form.data.search }));
  };

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
                    <div className="flex pl-4 mt-4 w-full mx-auto">
                      <CustomerSearchForm
                        value={form.data.search}
                        onChange={setSearchText}
                        onClick={searchCustomer}
                      />

                      <Link
                        href={route('customers.create')}
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
                            Name
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Kana
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Tel Number
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers &&
                          customers.data &&
                          customers.data.map((customer) => (
                            <tr key={customer.id}>
                              <td className="px-4 py-3">{customer.id}</td>
                              <td className="px-4 py-3">
                                <Link href={route('customers.edit', { customer: customer.id })}>
                                  {customer.name}
                                </Link>
                              </td>
                              <td className="px-4 py-3">{customer.kana}</td>
                              <td className="px-4 py-3 text-lg text-gray-900">{customer.tel}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <CustomerPaginations links={customers.links} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage flash={props.flash} />
    </AuthenticatedLayout>
  );
}
