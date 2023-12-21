/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
// import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { CountBox, CustomButton, Loader } from '../../../components';
import { calculateBarPercentage, daysLeft } from '../../../utils';
import { logoCF } from '../../../assets';
import { useGlobalContext } from '../../../context';
import { getCampaignById, donateToCampaign } from '../../../contract';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CampaignDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [campaign, setCampaign] = useState<any>(null);
  const [amount, setAmount] = useState(0);
  const [hasDonate, setHasDonate] = useState(false);

  const { loading, setLoading, getDonators, donators, donatorsAddress } =
    useGlobalContext();

  const fetchCampaignByID = (id: string) => {
    setLoading(true);
    getCampaignById(parseInt(id))
      .then((campaign) => {
        setCampaign(campaign);
        console.log('Logging from Campaign Details Page');
        console.log('Campaign', campaign);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching campaign:', error);
        setLoading(false);
      });
  };

  const handleDonate = () => {
    setHasDonate(true);
    donateToCampaign(parseInt(params.id), amount)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Error donating to campaign:', error);
        alert('Error donating to campaign');
      })
      .finally(() => {
        setHasDonate(false);
      });
  };

  useEffect(() => {
    fetchCampaignByID(params.id);
    getDonators(parseInt(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <Loader title="Retrieving campaign" />}
      {hasDonate && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={campaign?.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  Number(campaign?.target),
                  Number(campaign?.amountCollected)
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={daysLeft(campaign?.deadline)} />
          <CountBox
            title={`Raised of ${campaign?.target?.toString()}`}
            value={campaign?.amountCollected?.toString()}
          />
          <CountBox title="Total Backers" value={donators?.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <Image
                  src={logoCF}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {campaign?.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {campaign?.title}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {campaign?.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donatorsAddress && donatorsAddress?.length > 0 ? (
                donatorsAddress.map((item: any, index: any) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {donators[index]}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                onChange={(e) => setAmount(Number(e.target.value))}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
