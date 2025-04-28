import Link from "next/link";
import React from "react";
import Image from "next/image";

export const HomeLink = () => {
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
      <span className=" text-xl font-bold tracking-tight glow-text   text-text-primary ">
        BacklogsHub
      </span>
    </Link>
  );
};
