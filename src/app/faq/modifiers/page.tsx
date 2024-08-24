import Title from "@/components/Common/Title";
import Accordion from "@/components/Common/UI/Accordion";
import Divider from "@/components/Common/UI/Divider";
import LinkBase from "@/components/Common/UI/LinkBase";
import Notification from "@/components/Common/UI/Notification";
import React from "react";

const page = () => {
  return (
    <div>
      <Accordion
        defaultState={true}
        id={"modifiers"}
        title={<Title variant={2} title={"Modifiers list"} />}
      >
        <div>
          <div>
            <p className=" text-white">
              Description for all modifiers which you can use for backlogs
            </p>
            Full list:
            <ul>
              <li>
                <LinkBase href={"#Text"}>Steam Search</LinkBase>
              </li>
            </ul>
          </div>
          <Divider />
        </div>
      </Accordion>
      <Title variant={2} title={"Steam Search"} />
      <Notification
        text={
          "WIP. For now, just temporary - general information about what this modifier does."
        }
        type={"info"}
        options={{ showBtn: false }}
      />
      <p>
        Then when you add a new item you will see that the title field has
        changed slightly. Now it works not only as a title, but also as a search
        bar.
      </p>
      <p>
        After entering a query, you can link one of the results In this case,
        the title will be replaced by the game name and the Steam icon will be
        displayed. (To unlink, click on the steam icon)
      </p>
      <p>
        You can save it as is or fill other you own fields Now if you open your
        backlog, you will see information from Steam in the results in addition
        to your own fields
      </p>
    </div>
  );
};

export default page;
