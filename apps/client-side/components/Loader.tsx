import React from 'react';

import { loader } from '../assets';
import Image from 'next/image';

interface LoaderProps {
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({
  title = 'Transaction is in progress',
}) => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Image
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        {title} <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
