import Divider from "@/components/Common/UI/Divider";
import LinkBase from "@/components/Common/UI/LinkBase";
import { routesList } from "@/lib/routesList";
import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <p className=" text-white">Sections:</p>
        <Divider />
        <ul>
          <li>
            <LinkBase href={routesList.faqGeneral}>General</LinkBase>
            <p>Genaral information</p>
            <Divider />
          </li>
          <li>
            <LinkBase href={routesList.faqFields}>Backlkog Fileds </LinkBase>
            <p>Information about all available field types</p>
            <Divider />
          </li>
          <li>
            <LinkBase href={routesList.faqModifiers}>Modifiers</LinkBase>
            <p>Information about all available modifiers</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
