"use client";
import Select from "@/shared/ui/Select";
import Toggle from "@/shared/ui/Toggle";
import { toastCustom } from "@/shared/lib/toast";
import { updateUserInfo } from "@/shared/services/api/user";
import { UserDB } from "@/zodTypes";
import React from "react";
import Setting from "./Setting";

const Privacy = ({ data }: { data: Partial<UserDB> }) => {
  const { config } = data;
  return (
    <div className="flex flex-col">
      <Setting
        label={"Profile Visability"}
        description="If the profile is set to private, then all backlogs will be
            inaccessible for other users regardless of their visibility settings"
      >
        <Select
          defaultValue={config?.profileVisibility}
          layer={2}
          id="profileVisibility"
          options={["public", "private"]}
          onChange={async (e) => {
            const res = await updateUserInfo(
              "profileVisibility",
              e.target.value
            );
            if (res.success) toastCustom.success("Option changed");
          }}
        />
      </Setting>

      {config?.profileVisibility === "public" && (
        <>
          <Setting
            label={"Hide folders name:"}
            description='  Other users will see your folder names as "Folder
            1","Folder 2",... etc'
          >
            <Toggle
              value={config?.hideFolderNames || false}
              action={async (state) => {
                const res = await updateUserInfo("hideFolderNames", state);
                if (res.success) toastCustom.success("Option changed");
              }}
            />
          </Setting>
        </>
      )}
    </div>
  );
};

export default Privacy;
