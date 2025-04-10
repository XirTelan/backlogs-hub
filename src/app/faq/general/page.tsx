import Divider from "@/shared/ui/Divider";
import Notification from "@/shared/ui/Notification";

import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <p className=" text-white">General:</p>
        <Divider />
        <Notification
          text={"This section WIP"}
          type={"info"}
          options={{ showBtn: false }}
        />
      </div>
    </div>
  );
};

export default Page;
