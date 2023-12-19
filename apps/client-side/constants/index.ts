import {
  createCampaign,
  dashboard,
  payment,
  profile,
} from '../assets';

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
  }
];

export const contractAddress = "0x0fc8727b36d7d66fe5d28bd13873ae2e4352d220";