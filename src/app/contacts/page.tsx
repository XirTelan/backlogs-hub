import { getCurrentUserInfo } from "@/auth/utils";
import TextAreaInput from "@/components/Common/UI/TextAreaInput";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/InputField";
import Select from "@/components/Common/UI/Select";
import TopTitle from "@/components/Common/UI/TopTitle";
import { sendContactForm } from "@/services/Log";
import React from "react";

const page = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <TopTitle title="Contacts" />
      <main className="container self-center px-4 ">
        <div>
          <p>I&apos;d Love to Hear From You</p>
          <p>
            Whether you have a problemm, a question, or just want to share
            something, I&apos;m all ears.
          </p>
        </div>
        <div className=" max-w-xl bg-layer-1 p-4 ">
          <form action={sendContactForm}>
            {user?.username ? (
              <div>
                <div className="my-2">Name: {user.username}</div>
                <div className="hidden">
                  <input id="name" name="name" value={`${user.id}`}></input>
                </div>
              </div>
            ) : (
              <>
                <InputField
                  layer={2}
                  variant="small"
                  id="name"
                  name="name"
                  label="Name"
                />
              </>
            )}
            <InputField
              layer={2}
              variant="small"
              id="email"
              name="email"
              label="Email"
            />
            <Select
              layer={2}
              id="subject"
              name="subject"
              label="Subject"
              options={["Feedback/Suggestion", "Error/Bug", "Typo", "Other"]}
            ></Select>

            <TextAreaInput
              layer={2}
              id="description"
              name="description"
              label="Description"
              placeholder="Description"
            />
            <ButtonBase text="Send" />
          </form>
        </div>

        <p className="mt-10 text-sm text-secondary-text">
          Privacy Notice: If an email address is provided, it will only be used
          to respond to your message.
        </p>
      </main>
    </>
  );
};

export default page;
