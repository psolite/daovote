"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { options } from "@/constants";
import Image from "next/image";
import { AddIcon } from "@/assets";

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
    <section className="pt-[57px]">
      <div className="container mx-auto max-w-[592px] w-full">
        <div className="rounded-[30px] border px-[28.5px] pt-[19px] flex justify-center">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col gap-[5px] flex-wrap -mx-3">
                <p className="font-semibold text-[18px] leading-[27px] text-white ml-[26px]">Title*</p>
                <div className="w-full px-3">
                  <Input type="text" placeholder="eg. DAO Request for Development Proposal " {...register("regNumber")} />
                  {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                </div>
              </div>

              <div className="flex flex-col gap-[5px] flex-wrap -mx-3">
                <p className="font-semibold text-[18px] leading-[27px] text-white ml-[26px]">Description*</p>
                <div className="w-full px-3">
                  <textarea
                    placeholder="eg. This proposal suggests the development of a decentralized voting platform designed to facilitate transparent ...."
                    {...register("regNumber")}
                    className="h-[111px] w-[435px] rounded-[20px] px-[26px] py-1"
                  />
                  {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                </div>
              </div>

              <div className="flex flex-col gap-[5px] flex-wrap -mx-3">
                <p className="font-semibold text-[18px] leading-[27px] text-white ml-[26px]">Options*</p>
                <div className="w-full px-3">
                  <Input type="text" placeholder="eg. Solana" {...register("regNumber")} />
                  {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                </div>
                <ul className="flex items-center gap-[7px]">
                  {options.map((item, index) => (
                    <div key={index} className="flex items-center gap-[7px] px-[8px] rounded-[8px] border text-white">
                      <span className="">{item}</span>
                      <Image src={AddIcon} alt="add icon" />
                    </div>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-[5px] flex-wrap -mx-3">
                <p className="font-semibold text-[18px] leading-[27px] text-white ml-[26px]">Duration*</p>
                <div className="w-full px-3">
                  <Input type="text" placeholder="How many hours? eg. 48" {...register("regNumber")} />
                  {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
                </div>
                <ul className="flex items-center gap-[7px]">
                  {options.map((item, index) => (
                    <div key={index} className="flex items-center gap-[7px] px-[8px] rounded-[8px] border text-white">
                      <span className="">{item}</span>
                      <Image src={AddIcon} alt="add icon" />
                    </div>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size='lg'>
                Check Result
              </Button>
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePoll;
