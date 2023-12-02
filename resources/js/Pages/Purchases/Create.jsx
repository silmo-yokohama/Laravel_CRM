import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import PurchaseEditor from '@/Components/Editors/PurchaseEditor';
import { dateToString } from '@/common/dateToString';
import FlashMessage from '@/Components/Forms/Labels/FlashMessage';

const Create = (props) => {
  const { auth, customers, items, errors } = props;
  const form = useForm({
    customer_id: '',
    purchase_date: dateToString(),
    items: items.map((item) => {
      return { id: item.id, value: 0 };
    }),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    form.post(route('purchases.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">顧客追加</h2>}
    >
      <Head title="顧客追加" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font relative">
                <PurchaseEditor
                  form={form}
                  customers={customers}
                  items={items}
                  errors={errors}
                  isEditable={true}
                  isUpdate={false}
                  onSubmit={onSubmit}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage flash={props.flash} />
    </AuthenticatedLayout>
  );
};

export default Create;
