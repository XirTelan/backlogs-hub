"use client";
import React from "react";
import ButtonBase from "../shared/ui/ButtonBase";
import InputField from "../shared/ui/Input/InputField";
import Select from "../shared/ui/Select";
import TextAreaInput from "../shared/ui/TextAreaInput";
import { TokenData } from "@/features/auth/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { LogDTO } from "@/zodTypes";
import { toastCustom } from "@/lib/toast";

const DEFAULT: LogDTO = {
  name: "",
  email: "",
  subject: "Feedback/Suggestion",
  description: "",
  level: 0,
  confirmCode: "",
  code: "",
};

const ContactsForm = ({
  user,
  code,
}: {
  user: TokenData | null;
  code: string;
}) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      ...DEFAULT,
      confirmCode: code,
      name: user?.username || "",
    },
  });

  const onSubmit: SubmitHandler<LogDTO> = async (data) => {
    const res = await fetch("/api/data-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toastCustom.success(`Success`);
    } else {
      toastCustom.error(await res.json().then((data) => data.message));
    }
  };
  if (isSubmitSuccessful)
    return <div>Your feedback has been successfully sent</div>;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {user?.username ? (
          <div>
            <div className="my-2">Name: {user.username}</div>
            <div className="hidden">
              <input id="name" {...register("name")}></input>
            </div>
          </div>
        ) : (
          <>
            <InputField
              layer={2}
              variant="small"
              id="name"
              label="Name"
              {...register("name")}
            />
          </>
        )}
        <InputField
          isSimple
          layer={2}
          variant="small"
          placeholder="example@mail.com (optional)"
          id="email"
          label="Email"
          aria-label="email optional"
          {...register("email")}
        />
        <p className="my-2 text-xs text-text-secondary">
          Privacy Notice: If an email address is provided, it will only be used
          to respond to your message.
        </p>
        <Select
          layer={2}
          id="subject"
          label="Subject"
          options={["Feedback/Suggestion", "Error/Bug", "Typo", "Other"]}
          {...register("subject")}
        ></Select>

        <TextAreaInput
          layer={2}
          id="description"
          label="Description"
          placeholder="Description"
          {...register("description")}
        />

        <InputField
          label={
            <span>
              Confirmation. Please enter
              <span className=" mx-2 text-lg font-bold text-text-primary ">
                {code}
              </span>
              to confirm
            </span>
          }
          variant="small"
          layer={2}
          {...register("code", {
            validate: {
              required: (value) => {
                if (value !== String(code)) return "";
              },
            },
          })}
        />
        <ButtonBase disabled={!isValid || isSubmitSuccessful} text="Send" />
      </form>
    </div>
  );
};

export default ContactsForm;
