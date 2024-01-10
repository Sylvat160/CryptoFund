import axios from 'axios';
import { createCampaign, dashboard, payment, profile } from '../assets';
const baseUrl = 'http://localhost:3000/api';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];

export const contractAddress = '0x0fc8727b36d7d66fe5d28bd13873ae2e4352d220';

export const switchToSepoliaNetwork = async () => {
  try {
    // Specify the Sepolia network details
    const sepoliaNetwork = {
      chainId: '0x123456', // Replace with the correct chainId for Sepolia
      chainName: 'Sepolia',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://sepolia-rpc-url'], // Replace with the correct RPC URL
      blockExplorerUrls: ['https://sepolia-explorer-url'], // Replace with the correct explorer URL
    };

    // Send the request to add the Sepolia network
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [sepoliaNetwork],
    });

    console.log('Switched to Sepolia network');
  } catch (error) {
    console.error('Error switching to Sepolia network:', error);
  }
};

export const addCampaignToDatabase = async (data: unknown) => {
  await axios.post(`${baseUrl}/campaigns`, data);
};
