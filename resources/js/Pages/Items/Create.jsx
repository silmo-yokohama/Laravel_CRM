import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ItemsEditor from '@/Components/ItemsEditor';

export default function Create(props) {
  const { auth } = props;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    price: '',
    memo: '',
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setData(key, value);
  };

  const storeItem = (e) => {
    e.preventDefault();
    post(route('items.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">商品追加</h2>}
    >
      <Head title="商品追加" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font relative">
                <ItemsEditor
                  itemValues={data}
                  onChange={handleChange}
                  onSubmit={storeItem}
                  isEditable={true}
                  errors={errors}
                  processing={processing}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
