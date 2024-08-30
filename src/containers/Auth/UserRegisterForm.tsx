"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/Input/InputField";
import InputWithLoader from "@/components/Common/UI/Input/InputWithLoader";
import { apiRoutesList } from "@/lib/routesList";
import useLoaderValue from "@/hooks/useLoaderValue";
import { toastCustom } from "@/lib/toast";
import { RegistrationSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
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
        toastCustom.error(body.message);
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
          <InputField
            type="password"
            helperText={
              errors.passwordConfirm && {
                message: errors.passwordConfirm.message!,
                type: "error",
              }
            }
            label="Password confirm"
            {...register("passwordConfirm")}
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
