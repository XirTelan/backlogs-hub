import Link from "next/link";
import React from "react";
import Image from "next/image";

const HomeLink = () => {
  return (
    <Link
      href={"/"}
      className=" pe-8 content-center flex gap-1 items-center text-center ps-4 "
    >
      <Image
        alt=""
        className=" inline"
        width={18}
        height={18}
        src={"/logo.png"}
      />
      <span className="leading-[18px]    text-text-primary font-semibold">
        BacklogsHub
      </span>
    </Link>
  );
};

export default HomeLink;
