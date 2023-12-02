import CustomerEditor from '@/Components/Editors/CustomerEditor';
import FlashMessage from '@/Components/Forms/Labels/FlashMessage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

const Edit = (props) => {
  const { auth, customer } = props;
  const { data, setData, put, processing, errors } = useForm({
    name: customer.name,
    kana: customer.kana,
    tel: customer.tel,
    email: customer.email,
    postcode: customer.postcode,
    address: customer.address,
    birthday: customer.birthday,
    gender: customer.gender,
    memo: customer.memo,
  });

  const handleChange = (e) => {
    const key = e.target.id === 'man' || e.target.id === 'female' ? 'gender' : e.target.id;
    const value = e.target.value;

    setData(key, value);
  };

  const storeCustomer = (e) => {
    e.preventDefault();
    put(route('customers.update', { customer: customer.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">顧客編集</h2>}
    >
      <Head title="顧客編集" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font relative">
                <CustomerEditor
                  id={customer.id}
                  itemValues={data}
                  onChange={handleChange}
                  onSubmit={storeCustomer}
                  isEditable={true}
                  errors={errors}
                  processing={processing}
                  isUpdate={true}
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

export default Edit;
