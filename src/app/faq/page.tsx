import InputsDemoPage from "@/components/Common/InputsDemoPage";
import Title from "@/components/Common/Title";
import Accordion from "@/components/Common/UI/Accordion";
import Divider from "@/components/Common/UI/Divider";
import LinkBase from "@/components/Common/UI/LinkBase";
import React from "react";

const Page = () => {
  return (
    <div className="px-4">
      <div className="hiddent " id="backlogFields" />
      <Accordion
        defaultState={true}
        id={"fields"}
        title={<Title variant={2} title={"Backlog Field Types"} />}
      >
        <div>
          <div>
            <p className=" text-white">
              Description and examplase for all field types which you can use
              for backlogs
            </p>
            Full list:
            <ul>
              <li>
                <LinkBase href={"#Text"}>Text</LinkBase>
              </li>
              <li>
                <LinkBase href={"#Number"}>Number</LinkBase>
              </li>
              <li>
                <LinkBase href={"#Date"}>Date</LinkBase>
              </li>
              <li>
                <LinkBase href={"#Timer"}>Timer</LinkBase>
              </li>
              <li>
                <LinkBase href={"#Select"}>Select</LinkBase>
              </li>
            </ul>
          </div>
          <Divider />
          <InputsDemoPage />
        </div>
      </Accordion>
    </div>
  );
};

export default Page;
