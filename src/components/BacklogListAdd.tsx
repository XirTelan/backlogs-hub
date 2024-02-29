import React from "react";
import ButtonBase from "./Common/UI/ButtonBase";
import Link from "next/link";

const BacklogListAdd = ({ backlog }: { backlog: string }) => {
  return (
    <Link href={`/items/create?backlog=${backlog}`}>
      <ButtonBase type="button" text="Add new" />
    </Link>
  );
};

export default BacklogListAdd;
