"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/Input/InputField";
import LinkBase from "@/components/Common/UI/LinkBase";
import { apiRoutesList } from "@/lib/routesList";
import { toastCustom } from "@/lib/toast";
import { SignInSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { z } from "zod";

type FormData = z.infer<typeof SignInSchema>;
const UserLoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await fetch(apiRoutesList.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) router.refresh();
    else {
      const error = await res.json();
      toastCustom.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        helperText={
          errors.login && {
            message: errors.login.message!,
            type: "error",
          }
        }
        placeholder="Email or username"
        label="Continue with email/username"
        {...register("login")}
      />
      <InputField
        type="password"
        placeholder="Password"
        helperText={
          errors.password && {
            message: errors.password.message!,
            type: "error",
          }
        }
        label="Password"
        {...register("password")}
      />
      <span className=" inline-flex w-full items-center text-nowrap border-b border-subtle-1 pb-4 text-secondary-text">
        Don&apos;t have an account?&nbsp;
        <LinkBase href={"/register"}>Create</LinkBase>
      </span>
      <ButtonBase
        style={{ width: "100%" }}
        text="Continue"
        icon={<FaArrowRight size={16} />}
      />
    </form>
  );
};

export default UserLoginForm;
