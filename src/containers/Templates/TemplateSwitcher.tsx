import Switcher from "@/components/Common/UI/Switcher";
import React from "react";

const TemplateSwitcher = () => {
  const items = [
    {
      title: "All",
      key: "filter",
      value: "all",
    },
    {
      title: "My Own",
      key: "filter",
      value: "my",
    },
    {
      title: "System",
      key: "filter",
      value: "system",
    },
  ];
  return <Switcher items={items} />;
};

export default TemplateSwitcher;
