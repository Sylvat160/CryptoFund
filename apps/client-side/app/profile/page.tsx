/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { DisplayCampaigns } from '../../components';

export default function Profile() {
  const [userCampaign, setUserCampaign] = useState<any>([]);
  const { campaigns, loading, setLoading, walletAddress } = useGlobalContext();

  const getUserCampaigns = () => {
    setLoading(true);
    const filteredCampaigns = campaigns.filter(
      (campaign: any) => campaign.owner == walletAddress
    );
    setUserCampaign(filteredCampaigns);
    setLoading(false);
  };

  useEffect(() => {
    getUserCampaigns();
  }, []);

  return (
    <DisplayCampaigns
      title="Your campaigns"
      isLoading={loading}
      campaigns={userCampaign}
    />
  );
}
