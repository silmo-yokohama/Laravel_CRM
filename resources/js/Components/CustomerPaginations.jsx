import { Link } from '@inertiajs/react';
import React from 'react';

const CustomerPaginations = ({ links }) => {
  return (
    <div>
      {links && links.length > 3 && (
        <div className="flex flex-wrap -mb-1 justify-center">
          {links.map((item, key) => {
            const renderItem =
              item.url === null ? (
                <div
                  key={key}
                  className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                >
                  {item.label}
                </div>
              ) : (
                <Link
                  key={key}
                  href={item.url}
                  className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${
                    item.active ? 'bg-blue-700 text-white' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );

            return renderItem;
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerPaginations;
