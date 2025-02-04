import Link from "next/link";
import React from "react";

const HomeLink = () => {
  return (
    <Link href={"/"} className=" pe-8 content-center text-center ps-4 ">
      <span className="leading-[18px]    text-text-primary font-semibold">
        BacklogsHub
      </span>
    </Link>
  );
};

export default HomeLink;
