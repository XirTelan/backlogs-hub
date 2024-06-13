"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/InputField";
import InputWithLoader from "@/components/Common/UI/InputWithLoader";
import { apiRoutesList } from "@/data";
import useLoaderValue from "@/hooks/useLoaderValue";
import { RegistrationSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
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
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onBlur",
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(apiRoutesList.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (res.ok) {
        const signInRes = await fetch(apiRoutesList.signIn, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: data.username,
            password: data.password,
          }),
        });
        if (signInRes.ok) router.refresh();
      }
      if (res.status === 400) {
        toast.error(body.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      reset();
    }
  };
  const isUserExist = useCallback(async (value: string) => {
    const data = await fetch(`/api/users/${value}`, {
      method: "GET",
    }).then((res) => res.json());
    console.log("datares", data);
    return !data;
  }, []);
  const userName = watch("username", "");
  const { isAvailable, isLoading } = useLoaderValue(userName, isUserExist);

  return (
    <div className="ms-12 h-full w-80 self-start pt-10">
      <h1 className=" font-semibol mb-2 text-3xl">Create Your Account</h1>
      <div className="mb-4 mt-10 border-t border-subtle-1 " />
      <div className="flex flex-col gap-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithLoader
            helperText={
              errors.username && {
                message: errors.username.message!,
                type: "error",
              }
            }
            label="Username"
            isLoading={isLoading}
            isAvailable={isAvailable}
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

          <ButtonBase
            disabled={!isValid || isSubmitted || !isAvailable || isLoading}
            text="Continue"
            style={{ width: "100%" }}
            icon={<FaArrowRight />}
          >
            <FaArrowRight size={16} />
          </ButtonBase>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterForm;
