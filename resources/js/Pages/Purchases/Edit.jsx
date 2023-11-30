import FlashMessage from '@/Components/FlashMessage';
import PurchaseEditor from '@/Components/PurchaseEditor';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { dateToString } from '@/common/dateToString';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const Edit = (props) => {
  const { auth, customer, items, errors } = props;
  const form = useForm({
    customer_id: customer[0].id,
    purchase_date: dateToString(),
    items: items.map((item) => {
      return { id: item.id, value: 0 };
    }),
  });

  useEffect(() => {
    axios
      .get(`/api/purchase?id=${props.purchase.id}`, { purchase: props.purchase.id })
      .then((res) => {
        let selectedDate = null;
        let selectedItems = items.map((item) => {
          const find = res.data.find((v) => item.id === v.item_id);

          if (!selectedDate && find) selectedDate = dateToString(new Date(find.created_at));
          return {
            id: item.id,
            value: find ? find.count : 0,
          };
        });

        form.setData({
          customer_id: customer[0].id,
          purchase_date: selectedDate,
          items: selectedItems,
        });
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    form.put(route('purchases.update', { purchase: props.purchase.id }));
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
                  id={props.purchase.id}
                  form={form}
                  customers={customer}
                  items={items}
                  errors={errors}
                  isEditable={true}
                  isUpdate={true}
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

export default Edit;
