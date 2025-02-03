import Link from "next/link";
import React from "react";

const HomeLink = () => {
  return (
    <Link href={"/"} className="py-[15px] pe-8 ps-4 ">
      <span className="leading-[18px]    text-text-primary font-semibold">
        BacklogsHub
      </span>
    </Link>
  );
};

export default HomeLink;
