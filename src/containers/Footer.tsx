import LinkBase from "@/components/Common/UI/LinkBase";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto flex  w-full justify-center bg-black ">
      <div className="container my-4 ">
        <div className=" flex flex-col p-4 ">
          <LinkBase href={"/faq"}>FAQ</LinkBase>
          <LinkBase href={"/contacts"}>Contacts</LinkBase>
          <LinkBase href={"/updates"}>Updates</LinkBase>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
