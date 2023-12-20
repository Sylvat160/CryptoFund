'use client';
import React, { useEffect, useState } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import NavBar from '../components/NavBar';
// import { useGlobalContext } from '../context';
import { getCampaigns } from '../contract';

export default function Index() {
  const [campaigns, setCampaigns] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const { getCampaigns, loading, setLoading } =
  //   useGlobalContext();

  const fetchData = () => {
    try {
      setLoading(true);
      getCampaigns()
        .then((newCampaigns) => {
          setCampaigns(newCampaigns);
          console.log('Logging from Home Page');
          console.log('New Campaign', newCampaigns);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching campaigns:', error);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <NavBar />
      <DisplayCampaigns
        isLoading={loading}
        title="All campaigns"
        campaigns={campaigns}
      />
    </div>
  );
}
