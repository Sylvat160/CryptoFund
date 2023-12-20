/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createCampaign,
  getCampaigns,
  getDonators,
  ICampaign,
  connectWithMetaMask,
} from '../contract';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';

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
  setCampaigns?: (campaigns: any) => void;
  createCampaign: (campaign: ICampaign) => void;
  getCampaigns: typeof getCampaigns;
  getDonators: (campaignId: number) => void;
  connectWithMetaMask?: () => void;
}

export const GlobalContext = createContext<IGlobalContextProps>({
  user: {},
  loading: false,
  setUser: () => {},
  setLoading: () => {},
  createCampaign: () => {},
  getCampaigns: getCampaigns,
  getDonators: (campaignId: number) => {},
});

export const GlobalContextProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [donators, setDonators] = useState<any>([]);
  const [donatorsAddress, setDonatorsAddress] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<Web3Provider | null>(null); // Initialize with null
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const handleCampaignCreation = async (campaign: ICampaign) => {
    const parsedDeadline = parseFloat(campaign.deadline.toString()); // Convert the string to a floating-point number
    const deadlineInSeconds = Math.round(parsedDeadline);

    try {
      const newCampaign = await createCampaign(
        '0x452A12ad65C41D9A88f2515Af6c6F364060D4CE8',
        campaign.title,
        campaign.description,
        campaign.target,
        deadlineInSeconds,
        campaign.image
      );
      setCampaigns((prevCampaigns: any) => [...prevCampaigns, newCampaign]);
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const newCampaigns = await getCampaigns();
      setCampaigns(newCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonators = async (campaignId: number) => {
    const res = await getDonators(campaignId);
    setDonators(res.donations);
    setDonatorsAddress(res.addresses);
  };

  const connectToMetamask = async () => {
    const { signer, provider } = await connectWithMetaMask();
    setSigner(signer);
    setProvider(provider);
  };

  useEffect(() => {
    if (provider) {
      provider.listAccounts().then((accounts: string[]) => {
        setWalletAddress(accounts[0]);
      });
    }
  }, [provider]);

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
        setCampaigns,
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
