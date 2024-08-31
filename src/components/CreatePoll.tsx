"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { options } from "@/constants";
import Image from "next/image";
import { AddIcon, ArrowIcon, FingerPrintIcon, Left, Right } from "@/assets";
import { useState } from "react";
import ShareCard from "./ShareCard";

// Mock API function
const mockApiCall = async (data: any): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate successful API call
  return true;
};

interface CreatePollProps {}

const CreatePoll: FC<CreatePollProps> = ({}) => {
  const [isShareCardVisible, setIsShareCardVisible] = useState(false);

  const Schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    options: yup.array().of(yup.string()).min(2, "At least 2 options are required"),
    duration: yup.number().positive("Duration must be positive").required("Duration is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      title: '',
      description: '',
      options: ['', ''],
      duration: 0,
    }
  });

  const submitForm = async (data: any) => {
    try {
      const success = await mockApiCall(data);
      if (success) {
        setIsShareCardVisible(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const onSubmit = handleSubmit((data) => {
    submitForm(data);
    console.log("Form submitted with data:", data);
  });

  const handleCloseShareCard = () => {
    setIsShareCardVisible(false);
    reset(); // Reset the form when closing the ShareCard
  };

  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full px-4 sm:px-6 md:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-[492px]">
            <div className="card px-4 sm:px-[28.5px] pt-[35px] pb-[17px]">
              <h3 className="font-extrabold text-[18px] leading-[27px] md:text-[25px] md:leading-[37.5px] text-white text-center mb-2">Create a Poll</h3>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full">
                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[15px] leading-[22.5px] md:text-[18px] md:leading-[27px] text-white pl-[26px]">Title*</p>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="eg. DAO Request for Development Proposal"
                      {...register("title")}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Description*</p>

                    <textarea
                      placeholder="eg. This proposal suggests the development of a decentralized voting platform designed to facilitate transparent ...."
                      {...register("description")}
                      className="min-h-[111px] w-full rounded-[20px] px-[26px] pt-[17px]"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Options*</p>
                    <Input className="w-full" type="text" placeholder="eg. Solana" {...register("options.0")} />
                    {errors.options && <p className="text-red-500 text-xs italic">{errors.options.message}</p>}
                    <ul className="flex items-center justify-center gap-[7px]">
                      {options.map((item, index) => (
                        <div key={index} className="flex items-center gap-[7px] px-[8px] rounded-[8px] border text-white">
                          <span className="">{item}</span>
                          <Image src={AddIcon} alt="add icon" />
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-[5px] w-full">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Duration*</p>
                    <Input className="w-full" type="number" placeholder="How many hours? eg. 48" {...register("duration")} />
                    {errors.duration && <p className="text-red-500 text-xs italic">{errors.duration.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="lg" type="submit">
                      Submit
                    </Button>
                    <span className="text-[13px] leading-[19.5px] italic text-center text-white">Fee: 0.01 Sol</span>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold text-[10px] leading-[15px] md:text-[20px] md:leading-[30px] text-white">View your previous poll</span>
              <Image src={ArrowIcon} alt="arrow icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Styling Images */}
      <Image src={Left} alt="voting box image" className="hidden lg:block absolute top-[30%] left-0" />
      <Image src={Right} alt="voting box image" className="hidden lg:block absolute top-[40%] right-0" />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="hidden lg:block absolute bottom-[10%] left-[20%] rotate-left"
      />
      <Image
        src={FingerPrintIcon}
        alt="fingerprint icon"
        className="block absolute -bottom-[1%] -right-[1%] rotate-right"
      />
      {isShareCardVisible && (
        <div className="fixed inset-0 bg-primary/80 bg-opacity-50 flex items-center justify-center z-50">
          <ShareCard onClose={handleCloseShareCard} />
        </div>
      )}
    </section>
  );
};

export default CreatePoll;
