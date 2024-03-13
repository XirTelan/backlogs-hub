import Link from "next/link";
import React from "react";

const HomeLink = () => {
  return (
    <Link
      href={"/"}
      className="  py-[15px] pe-8 ps-4 text-sm leading-[18px] text-primary-text"
    >
      BacklogsHub
    </Link>
  );
};

export default HomeLink;
