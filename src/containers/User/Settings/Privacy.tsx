"use client";
import Select from "@/components/Common/UI/Select";
import Toggle from "@/components/Common/UI/Toggle";
import { toastCustom } from "@/lib/toast";
import { updateUserInfo } from "@/services/user";
import { UserDTO } from "@/zodTypes";
import React from "react";

const Privacy = ({
  data,
}: {
  data: Partial<UserDTO> & { config: UserDTO["config"] };
}) => {
  const { config } = data;
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-between">
        <Select
          defaultValue={config.profileVisibility}
          layer={2}
          variant="inline"
          label="Profile Visability"
          id="profileVisibility"
          options={["public", "private"]}
          onChange={async (e) => {
            const res = await updateUserInfo(
              "profileVisibility",
              e.target.value,
            );
            if (res.isSuccess) toastCustom.success("Option changed");
          }}
        />
      </div>
      <label
        htmlFor="profileVisibility"
        className="mb-4 text-sm text-secondary-text"
      >
        If the profile is set to private, then all backlogs will be inaccessible
        for other users regardless of their visibility settings

      </label>
      {config.profileVisibility === "public" && (
        <>
          <div className="flex justify-between">
            <span>Hide folders name:</span>
            <Toggle
              defaultValue={config.showEmptyFolders || false}
              action={async (state) => {
                const res = await updateUserInfo("hideFolderNames", state);
                if (res.isSuccess) toastCustom.success("Option changed");
              }}
            />
          </div>
          <label
            htmlFor="profileVisibility"
            className="mb-4 text-sm text-secondary-text"
          >
            Other users will see your folder names as &quot;Folder
            1&quot;,&quot;Folder 2&quot;,... etc
          </label>
        </>
      )}
    </div>
  );
};

export default Privacy;
