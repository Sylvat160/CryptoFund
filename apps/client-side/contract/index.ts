/* eslint-disable @typescript-eslint/no-explicit-any */
import contract from './CrowdFunding.json';
import { BigNumber, ethers } from 'ethers';
export const contractAddress = '0x0fc8727b36d7d66fe5d28bd13873ae2e4352d220';
export const { abi: ABI } = contract;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface ICampaign {
  id?: number;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  image: string;
  raised?: number;
}

export async function connectWithMetaMask(
  setProvider?: (provider: any) => void
) {
  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    throw alert('Please install MetaMask to access this feature.');
  }

  // Request access to the user's MetaMask accounts
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  // Create a new instance of ethers.js provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider && setProvider(provider);

  // Get the signer object
  const signer = provider.getSigner();

  // Return the signer and provider
  return { signer, provider };
}

export const createCampaign = async (
  owner: string,
  title: string,
  description: string,
  target: BigNumber,
  deadline: number,
  image: string
) => {
  try {
    // Connect with MetaMask and get the signer
    const { signer } = await connectWithMetaMask();
    console.log(contractAddress);

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Call the createCampaign function
    const tx = await contract.createCampaign(
      owner,
      title,
      description,
      target,
      deadline,
      image
    );
    await tx.wait();

    return tx;
  } catch (error) {
    console.error('Failed to create campaign:', error);
    throw error;
  }
};

export const donateToCampaign = async (
  campaignId: number,
  amount: number
): Promise<void> => {
  try {
    // Connect with MetaMask and get the signer
    const { signer } = await connectWithMetaMask();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Call the donateToCampaign function
    const tx = await contract.donateToCampaign(campaignId, { value: amount });
    await tx.wait();

    console.log('Donation successful:', amount);
  } catch (error) {
    console.error('Failed to donate to campaign:', error);
    throw error;
  }
};

export const getCampaigns = async (setProvider: any) => {
  try {
    // Connect with MetaMask and get the signer
    const { signer } = await connectWithMetaMask(setProvider);

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Call the getCampaigns function
    const campaigns = await contract.getCampaigns();

    return campaigns;
  } catch (error) {
    console.error('Failed to get campaigns:', error);
    throw error;
  }
};

export const getCampaignById = async (campaignId: number) => {
  try {
    const { signer } = await connectWithMetaMask();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Call the getCampaign function with the specified ID
    const campaign = await contract.campaigns(campaignId);

    return campaign;
  } catch (error) {
    console.error(`Failed to get campaign with ID ${campaignId}:`, error);
    throw error;
  }
};

export const getDonators = async (
  campaignId: number
): Promise<{ addresses: string[]; donations: number[] }> => {
  try {
    // Connect with MetaMask and get the signer
    const { signer } = await connectWithMetaMask();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Call the getDonators function
    const result = await contract.getDonators(campaignId);

    // Extract the addresses and donations arrays
    const addresses = result[0];
    const donations = result[1].map((value: { toNumber: () => number }) =>
      value.toNumber()
    );

    console.log('Donators:', addresses, donations);

    return { addresses, donations };
  } catch (error) {
    console.error('Failed to get donators:', error);
    throw error;
  }
};
