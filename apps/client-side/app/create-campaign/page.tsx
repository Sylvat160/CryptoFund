/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { useState } from 'react';
import { useGlobalContext } from '../../context';
import { useRouter } from 'next/navigation';
import { money } from '../../assets';
import { CustomButton, FormField, Loader } from '../../components';
// import { ICampaign } from '../../contract';
import { checkIfImage } from '../../utils';
import Image from 'next/image';

export default function CreateCampaign() {
  const router = useRouter();
  const { createCampaign, loading } = useGlobalContext();
  const [form, setForm] = useState<any>({
    owner: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName: string, e: any) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists: boolean) => {
      if (!exists) {
        setForm({ ...form, image: '' });
        alert('Please upload an image');
        return;
      }

      try {
        createCampaign(form, router);
      } catch (error) {
        console.error('Error creating campaign:', error);
      }
    });
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {loading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
          {/* <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          /> */}
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <Image
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#8c6dfd]"
          />
        </div>
      </form>
    </div>
  );
}
