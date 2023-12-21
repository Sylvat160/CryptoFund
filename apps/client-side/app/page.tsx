/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import NavBar from '../components/NavBar';
import { useGlobalContext } from '../context';
import { CustomButton } from '../components';
import { switchToSepoliaNetwork } from '../constants';

export default function Index() {
  const {
    getCampaigns,
    loading,
    campaigns,
    setProvider,
    hasMetamask,
    provider,
  } = useGlobalContext();

  useEffect(() => {
    getCampaigns(setProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      {!hasMetamask ? (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
          <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center mb-5">
            You need to install Metamask to continue..
          </p>
          <div
            className={`font-epilogue font-semibold text-[16px] leading-[26px] bg-[#8C6DFD] text-white min-h-[52px] px-4 rounded-[10px] flex justify-center items-center`}
          >
            <a href="https://metamask.io/download/" target="_blank">
              Download Metamask!
            </a>
          </div>
        </div>
      ) : provider?._network?.chainId != 11155111 ? (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
          <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center mb-5">
            You must use Sepolia Testnet Network to continue..
          </p>
          <div
            className={`font-epilogue font-semibold text-[16px] leading-[26px] bg-[#8C6DFD] text-white min-h-[52px] px-4 rounded-[10px] flex justify-center items-center`}
          >
            <CustomButton
              title="Change network"
              btnType="button"
              handleClick={switchToSepoliaNetwork}
            />
          </div>
        </div>
      ) : null}

      <NavBar />
      <DisplayCampaigns
        isLoading={loading}
        title="All campaigns"
        campaigns={campaigns}
      />
    </div>
  );
}
