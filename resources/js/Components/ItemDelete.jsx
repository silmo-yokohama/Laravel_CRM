import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import React from 'react';

const ItemDelete = ({ id }) => {
  const form = useForm({});

  const deleteItem = () => {
    form.delete(route('items.destroy', { item: id }));
  };

  return (
    <div>
      <button onClick={deleteItem}>削除</button>
    </div>
  );
};

export default ItemDelete;
