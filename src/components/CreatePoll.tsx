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

interface CreatePollProps {}

const CreatePoll: FC<CreatePollProps> = ({}) => {
  const Schema = yup.object().shape({
    regNumber: yup.string().required(),
    pin: yup.string().required(),
    session: yup.object().required(),
    term: yup.object().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const submitForm = (data: any) => {
    console.log({
      ...data,
      session: data.session.value,
      term: data.term.value,
    });
    alert("Submited!");
  };

  return (
    <section className="pt-[122px] pb-[107px] relative">
      <div className="container mx-auto w-full">
        <div className="flex justify-center">
          <div className="flex flex-col gap-[22px]">
            <div className="max-w-[492px] card px-[28.5px] pt-[35px] pb-[17px]">
              <h3 className="font-extrabold text-[25px] leading-[37.5px] text-white text-center mb-2">Create a Poll</h3>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="flex flex-col gap-[5px] flex-wrap">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Title*</p>
                    <Input className="w-[435px]" type="text" placeholder="eg. DAO Request for Development Proposal " {...register("regNumber")} />
                    {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] flex-wrap">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Description*</p>

                    <textarea
                      placeholder="eg. This proposal suggests the development of a decentralized voting platform designed to facilitate transparent ...."
                      {...register("regNumber")}
                      className="min-h-[111px] w-[435px] rounded-[20px] px-[26px] pt-[17px]"
                    />
                    {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                  </div>

                  <div className="flex flex-col gap-[5px] flex-wrap">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Options*</p>
                    <Input className="w-[435px]" type="text" placeholder="eg. Solana" {...register("regNumber")} />
                    {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                    <ul className="flex items-center justify-center gap-[7px]">
                      {options.map((item, index) => (
                        <div key={index} className="flex items-center gap-[7px] px-[8px] rounded-[8px] border text-white">
                          <span className="">{item}</span>
                          <Image src={AddIcon} alt="add icon" />
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-[5px] flex-wrap">
                    <p className="font-semibold text-[18px] leading-[27px] text-white pl-[26px]">Duration*</p>
                    <Input className="w-[435px]" type="text" placeholder="How many hours? eg. 48" {...register("regNumber")} />
                    {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="lg">
                      Check Result
                    </Button>
                    <span className="text-[13px] leading-[19.5px] italic text-center text-white">Fee: 0.01 Sol</span>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold text-[20px] leading-[30px] text-white">View your previous poll</span>
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
        className="hidden lg:block absolute -bottom-[1%] -right-[1%] rotate-right"
      />
    </section>
  );
};

export default CreatePoll;
