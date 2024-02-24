"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/InputField";
import { RegistrationSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";
import { z } from "zod";

type FormData = z.infer<typeof RegistrationSchema>;

const UserRegisterForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onBlur",
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (res.ok) {
      router.push("/");
    }
    if (res.status === 400) {
      toast.error(body.message);
    }
    reset();
  };

  return (
    <div className="ms-12 h-full w-80 self-start pt-10">
      <h1 className=" font-semibol mb-2 text-3xl">Create Your Account</h1>
      <div className="mb-4 mt-10 border-t border-subtle-1 " />
      <div className="flex flex-col gap-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            helperText={
              errors.username && {
                message: errors.username.message!,
                type: "error",
              }
            }
            label="Username"
            {...register("username")}
          />
          <InputField
            helperText={
              errors.email && {
                message: errors.email.message!,
                type: "error",
              }
            }
            label="Email"
            {...register("email")}
          />
          <InputField
            type="password"
            helperText={
              errors.password && {
                message: errors.password.message!,
                type: "error",
              }
            }
            label="Password"
            {...register("password")}
          />

          <ButtonBase disabled={!isValid || isSubmitted} text="Continue">
            <FaArrowRight size={16} />
          </ButtonBase>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterForm;
