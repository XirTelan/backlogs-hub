import Divider from "@/components/Common/UI/Divider";
import Notification from "@/components/Common/UI/Notification";

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
