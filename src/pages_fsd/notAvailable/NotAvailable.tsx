import React from "react";

const NotAvailable = ({ text }: { text?: string }) => {
  return (
    <div className=" flex h-[calc(100vh-49px)] items-center justify-center ">
      {text ? text : "Not Available"}
    </div>
  );
};

export default NotAvailable;
