import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import InputError from '@/Components/InputError';
import ItemsEditor from '@/Components/ItemsEditor';
import ItemDelete from '@/Components/ItemDelete';

export default function Create(props) {
  const { auth, item } = props;
  const [itemValues, setItemValues] = useState({
    name: item.name,
    price: item.price,
    memo: item.memo,
  });

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{item.name}</h2>}
    >
      <Head title={item.name} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <Link href={route('items.edit', { item: item.id })}>編集</Link>
              <ItemDelete id={item.id} />
              <section className="text-gray-600 body-font relative">
                <ItemsEditor itemValues={itemValues} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
