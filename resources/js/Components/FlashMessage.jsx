import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import IconCheckMark from './IconCheckMark';
import IconInformatiion from './IconInformatiion';

const FlashMessage = ({ flash }) => {
  const { message, status } = flash;
  const [isVisible, setIsVisible] = useState(true);

  const errorStyles =
    'flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-red-100 bg-red-700 border border-red-700';
  const successStyles =
    'flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-green-100 bg-green-700 border border-green-700';
  const warnStyles =
    'flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-yellow-100 bg-yellow-700 border border-yellow-700';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <motion.div className="fixed z-50 top-20 right-8" animate={{ opacity: isVisible ? 1 : 0 }}>
      {message && (
        <div
          className={
            status === 'success' ? successStyles : status === 'error' ? errorStyles : warnStyles
          }
        >
          {status === 'success' ? <IconCheckMark /> : <IconInformatiion />}
          <div class="text-xl font-normal  max-w-full flex-initial">{message}</div>
          <div class="flex flex-auto flex-row-reverse" onClick={() => setIsVisible(false)}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FlashMessage;
