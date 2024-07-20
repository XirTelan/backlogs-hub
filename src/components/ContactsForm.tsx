"use client";
import React from "react";
import ButtonBase from "./Common/UI/ButtonBase";
import InputField from "./Common/UI/InputField";
import Select from "./Common/UI/Select";
import TextAreaInput from "./Common/UI/TextAreaInput";
import { TokenData } from "@/auth/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { LogDTO } from "@/zodTypes";
import { sendContactForm } from "@/services/log";

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
    await sendContactForm(data);
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
          placeholder="example@mail.com"
          id="email"
          label="Email"
          {...register("email")}
        />
        <p className="my-2 text-xs text-subtle-3">
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
              Confirmation. Please enter{" "}
              <span className=" text-lg font-bold ">{code}</span> to confirm{" "}
            </span>
          }
          layer={2}
          {...register("code", {
            validate: {
              required: (value) => {
                if (value !== String(code)) return "";
              },
            },
          })}
        />
        <ButtonBase disabled={!isValid} text="Send" />
      </form>
    </div>
  );
};

export default ContactsForm;
