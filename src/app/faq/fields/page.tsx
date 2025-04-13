import { Accordion, Title, LinkBase, Divider } from "@/shared/ui";
import { InputsDemoPage } from "@/widgets/InputsDemo/ui/InputsDemo";
import React from "react";

const page = () => {
  return (
    <div>
      <Accordion
        defaultState={true}
        id={"fields"}
        title={<Title variant={2} title={"Backlog Field Types"} />}
      >
        <div>
          <div>
            <p className=" text-white">
              Description and examples for all field types which you can use for
              backlogs
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
              <li>
                <LinkBase href={"#Markdown"}>Markdown</LinkBase>
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

export default page;
