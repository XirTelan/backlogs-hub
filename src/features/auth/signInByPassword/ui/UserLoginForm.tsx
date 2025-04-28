"use client";

import { apiRoutesList } from "@/shared/constants/routesList";
import { toastCustom } from "@/shared/lib/toast";
import { InputField, LinkBase, ButtonBase } from "@/shared/ui";
import { SignInSchema } from "@/shared/zodSchemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { z } from "zod";

type FormData = z.infer<typeof SignInSchema>;
export const UserLoginForm = () => {
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
        placeholder="name@example.com"
        label="Email/username"
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
      <ButtonBase
        style={{ width: "100%" }}
        text="Sign In"
        icon={<FaArrowRight size={16} />}
      />
      <span className="mt-4 inline-flex w-full items-center text-nowrap text-text-secondary">
        Don&apos;t have an account?&nbsp;
        <LinkBase href={"/register"}>Create</LinkBase>
      </span>
    </form>
  );
};
