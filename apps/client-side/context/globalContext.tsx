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
import { ethers } from 'ethers';
import { addCampaignToDatabase } from '../constants';

interface IGlobalContextProps {
  user: any;
  loading: boolean;
  hasMetamask?: boolean;
  walletAddress?: string;
  campaigns?: any;
  donators?: any;
  donatorsAddress?: string[];
  provider?: any;
  signer?: any;
  setUser: (user: any) => void;
  setProvider?: (provider: any) => void;
  setLoading: (loading: boolean) => void;
  setCampaigns?: (campaigns: any) => void;
  createCampaign: (campaign: ICampaign, router: any) => void;
  getCampaigns: (cb: any) => void;
  getDonators: (campaignId: number) => void;
  connectWithMetaMask?: () => void;
  setHasMetamask?: (hasMetamask: boolean) => void;
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
  const [hasMetamask, setHasMetamask] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [donators, setDonators] = useState<any>([]);
  const [donatorsAddress, setDonatorsAddress] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<Web3Provider | null>(null); // Initialize with null
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  // const handleCampaignCreation = async (campaign: ICampaign) => {
  //   const parsedDeadline = parseFloat(campaign.deadline.toString()); // Convert the string to a floating-point number
  //   const deadlineInSeconds = Math.round(parsedDeadline);

  //   try {
  //     setIsLoading(true);
  //     if (walletAddress != '') {
  //       const newCampaign = await createCampaign(
  //         walletAddress,
  //         campaign.title,
  //         campaign.description,
  //         campaign.target,
  //         deadlineInSeconds,
  //         campaign.image
  //       );
  //       setCampaigns((prevCampaigns: any) => [...prevCampaigns, newCampaign]);
  //     } else {
  //       alert('Please connect to MetaMask');
  //     }
  //   } catch (error) {
  //     console.error('Error creating campaign:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const addCampaignToDB = async (campaign: ICampaign) => {
    await addCampaignToDatabase({
      ...campaign,
      deadline: new Date(campaign.deadline).toISOString(),
      amountCollected: '0',
    });
  };
  const handleCampaignCreation = (campaign: ICampaign, router: any) => {
    const parsedDeadline = parseFloat(campaign.deadline.toString()); // Convert the string to a floating-point number
    const deadlineInSeconds = Math.round(parsedDeadline);

    setIsLoading(true);

    if (walletAddress !== '') {
      createCampaign(
        walletAddress,
        campaign.title,
        campaign.description,
        ethers.utils.parseUnits(campaign.target, 18),
        new Date(campaign.deadline).getTime(),
        campaign.image
      )
        .then((newCampaign) => {
          addCampaignToDB(campaign);
          setCampaigns((prevCampaigns: any) => [...prevCampaigns, newCampaign]);
          router.push('/');
        })
        .catch((error) => {
          console.error('Error creating campaign:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert('Please connect to MetaMask');
      setIsLoading(false);
    }
  };

  const fetchCampaigns = () => {
    setIsLoading(true);
    getCampaigns(setProvider)
      .then((newCampaigns) => {
        setCampaigns(newCampaigns);
      })
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDonators = (campaignId: number) => {
    setIsLoading(true);
    return getDonators(campaignId)
      .then((res) => {
        setDonators(res.donations);
        setDonatorsAddress(res.addresses);
      })
      .catch((error) => {
        console.error('Error fetching donators:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const connectToMetamask = () => {
    return new Promise<void>((resolve, reject) => {
      connectWithMetaMask()
        .then(({ signer, provider }) => {
          setSigner(signer);
          setProvider(provider);
          resolve();
        })
        .catch((error) => {
          console.error('Error connecting to MetaMask:', error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (provider) {
      provider.listAccounts().then((accounts: string[]) => {
        setWalletAddress(accounts[0]);
        setHasMetamask(true);
        setSigner(provider.getSigner());
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
        setProvider,
        hasMetamask,
        setHasMetamask,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext: () => IGlobalContextProps = () =>
  useContext(GlobalContext);
