'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image from next

import { logo, logout } from '../assets';
import { navlinks } from '../constants';

interface IconProps {
  styles?: string;
  name: string;
  imgUrl: string;
  isActive: string | undefined;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && 'bg-[#2c2f32]'
    } flex justify-center items-center ${
      !disabled && 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" width={24} height={24} />
    ) : (
      <Image
        src={imgUrl}
        alt="fund_logo"
        width={24}
        height={24}
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);


const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<string>('dashboard');

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div onClick={() => router.push('/')}>
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl={logo}
          name="logo"
          isActive={isActive}
          disabled={false}
          handleClick={() => setIsActive('logo')}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <div
              key={link.name}
              onClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                }
              }}
            >
              <Icon {...link} isActive={isActive} />
            </div>
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={logout}
          name="logout"
          isActive={isActive}
          disabled={false}
          handleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Sidebar;
