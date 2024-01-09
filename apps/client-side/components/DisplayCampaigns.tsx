/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/navigation';
import { loader } from '../assets';
import { FundCard } from '.';
import Image from 'next/image';

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: any;
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({
  title,
  isLoading,
  campaigns = [],
}) => {
  const router = useRouter();
  //   const router = useRouter();
  //   const { id } = router.query;

  const handleNavigate = (campaignId: number) => {
    router.push(`/campaign-details/${campaignId}`);
  };
  // const handleNavigate = (campaignId: number) => {
  //   router.push({
  //     pathname: `/campaign-details/${campaignId}`,
  //     query: { id: campaignId },
  //   });
  // };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns?.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created a campaign yet
          </p>
        )}

        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns.map((campaign: any, idx: number) => (
            <FundCard
              key={idx}
              owner={campaign?.owner}
              title={campaign?.title}
              description={campaign?.description}
              target={campaign?.target?.toString()}
              // deadline={campaign?.deadline?.toString()}
              deadline={campaign.deadline?.toNumber()}
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              amountCollected={campaign?.raised?.toString()}
              image={campaign?.image}
              handleClick={() => handleNavigate(idx)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
