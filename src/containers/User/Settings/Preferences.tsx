import Toggle from "@/components/Common/UI/Toggle";
import React, { useState } from "react";

const Preferences = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      Preferences
      <div>
        <Toggle state={isShow} setState={setIsShow} />
      </div>
    </div>
  );
};

export default Preferences;
