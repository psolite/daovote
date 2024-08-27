"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

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
    <section className="">
      <div className="container mx-auto max-w-[492px] w-full">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                <p className="font-semibold">Reg Number</p>
              </div>
              <div className="w-full sm:w-2/3 px-3 mb-6 md:mb-0">
                <Input type="text" placeholder="e.g SKA100001347" {...register("regNumber")} />
                {errors.regNumber && <p className="text-red-500 text-xs italic">Please enter a valid Reg Number</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                <p className="font-semibold">Access Pin</p>
              </div>
              <div className="w-full sm:w-2/3 px-3 mb-6 md:mb-0">
                <Input type="text" placeholder="e.g 1551234567sde" {...register("pin")} />
                {errors.pin && <p className="text-red-500 text-xs italic">Please enter a valid access pin number</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                <p className="font-semibold">Select Session</p>
              </div>
              <div className="w-full sm:w-2/3 px-3 mb-6 md:mb-0 text-black"></div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/3 px-3 mb-2 md:mb-0">
                <p className="font-semibold">Select Term</p>
              </div>
              <div className="w-full sm:w-2/3 px-3 mb-6 md:mb-0 text-black"></div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/3 px-3"></div>
              <div className="w-full sm:w-2/3 px-3 mb-6 md:mb-0">
                <Button className="w-full">Check Result</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePoll;
