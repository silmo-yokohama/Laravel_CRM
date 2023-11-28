import { useForm } from '@inertiajs/react';
import React from 'react';

const CustomerDelete = ({ id, processing }) => {
  const form = useForm({});
  const deleteCustomer = () => {
    console.log('Delete', id);
    form.delete(route('customers.destroy', { customer: id }));
  };
  return (
    <button
      type="button"
      disabled={processing}
      className="inline-block mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
      onClick={deleteCustomer}
    >
      削除
    </button>
  );
};

export default CustomerDelete;
