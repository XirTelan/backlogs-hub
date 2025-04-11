import React, { useCallback } from "react";
import useLoaderValue from "@/shared/hooks/useLoaderValue";
import { changeUserName } from "@/shared/api/user";
import { useForm } from "react-hook-form";
import { apiRoutesList } from "@/shared/lib/routesList";
import { toastCustom } from "@/shared/lib/toast";
import { useRouter } from "next/navigation";
import { Title, InputWithLoader, ButtonBase } from "@/shared/ui";

type Form = { userName: string };

const ChangeNameForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitted },
  } = useForm<Form>({ defaultValues: { userName: "" } });
  const router = useRouter();
  const value = watch("userName");
  const isUserExist = useCallback(async (value: string) => {
    const data = await fetch(`/api/users/${value}`, {
      method: "GET",
    }).then((res) => res.json());
    return !data;
  }, []);

  const onSubmit = async (formData: Form) => {
    const update = await changeUserName(formData.userName);
    if (!update.success) return;
    const res = await fetch(`${apiRoutesList.auth}/refresh`, {
      method: "POST",
    });
    if (res.ok) {
      toastCustom.success("Success");
      router.refresh();
    }
  };

  const { isLoading, isAvailable } = useLoaderValue(value, isUserExist);
  return (
    <div className=" bg-bg-main p-4 text-white">
      <Title variant={2} title={"Change user name"}></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithLoader
          placeholder="Username"
          isAvailable={isAvailable}
          isLoading={isLoading}
          {...register("userName", { required: true, minLength: 3 })}
        ></InputWithLoader>
        <ButtonBase
          disabled={!isValid || isSubmitted || (!isAvailable && !isLoading)}
          text="Change username"
        ></ButtonBase>
      </form>
    </div>
  );
};

export default ChangeNameForm;
