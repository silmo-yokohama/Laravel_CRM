import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ItemsEditor from '@/Components/ItemsEditor';
import FlashMessage from '@/Components/FlashMessage';

export default function Create(props) {
  const { auth, item } = props;
  const { data, setData, put, processing, errors } = useForm({
    name: item.name,
    price: item.price,
    memo: item.memo,
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setData(key, value);
  };

  const updateItem = (e) => {
    e.preventDefault();
    put(route('items.update', { item: item.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`${item.name} の編集`}</h2>
      }
    >
      <Head title={`${item.name} の編集`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font relative">
                <ItemsEditor
                  itemValues={data}
                  onChange={handleChange}
                  onSubmit={updateItem}
                  isEditable={true}
                  errors={errors}
                  processing={processing}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage flash={props.flash} />
    </AuthenticatedLayout>
  );
}
