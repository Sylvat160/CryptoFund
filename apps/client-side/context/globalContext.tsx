/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createContext, useContext, useState } from 'react';
import {
  createCampaign,
  getCampaigns,
  getDonators,
  ICampaign,
  connectWithMetaMask,
} from '../contract';

interface IGlobalContextProps {
  user: any;
  loading: boolean;
  walletAddress?: string;
  campaigns?: any;
  donators?: any;
  donatorsAddress?: string[];
  provider?: any;
  signer?: any;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  createCampaign: (campaign: ICampaign) => void;
  getCampaigns: typeof getCampaigns;
  getDonators: (campaignId: number) => void;
  connectWithMetaMask?: () => void;
}

export const GlobalContext = createContext<IGlobalContextProps>({
  user: {},
  loading: true,
  setUser: () => {},
  setLoading: () => {},
  createCampaign: () => {},
  getCampaigns: getCampaigns,
  getDonators: (campaignId: number) => {},
});

export const GlobalContextProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [donators, setDonators] = useState<any>([]);
  const [donatorsAddress, setDonatorsAddress] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState<any>();

  const handleCampaignCreation = async (campaign: ICampaign) => {
    const newCampaign = await createCampaign(
      walletAddress,
      campaign.title,
      campaign.description,
      campaign.target,
      campaign.deadline,
      campaign.image
    );
    setCampaigns([...campaigns, newCampaign]);
  };

  const fetchCampaigns = async () => {
    const campaigns = await getCampaigns();
    setCampaigns(campaigns);
  };

  const fetchDonators = async (campaignId: number) => {
    const res = await getDonators(campaignId);
    setDonators(res.donations);
    setDonatorsAddress(res.addresses);
  };

  const connectToMetamask = async () => {
    const signer = await connectWithMetaMask();
    setSigner(signer);
  };

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        createCampaign: handleCampaignCreation,
        getCampaigns: fetchCampaigns,
        getDonators: fetchDonators,
        walletAddress,
        campaigns,
        donators,
        donatorsAddress,
        provider,
        signer,
        connectWithMetaMask: connectToMetamask,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
