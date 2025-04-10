import Switcher from "@/shared/ui/Switcher";
import React from "react";

const TemplateSwitcher = () => {
  const items = {
    key: "filter",
    items: [
      {
        title: "All",
        value: "all",
      },
      {
        title: "My Own",
        value: "my",
      },
      {
        title: "System",
        value: "system",
      },
    ],
  };
  return <Switcher options={items} />;
};

export default TemplateSwitcher;
