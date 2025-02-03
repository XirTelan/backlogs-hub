import Title from "@/components/Common/Title";
import Divider from "@/components/Common/UI/Divider";
import LinkBase from "@/components/Common/UI/LinkBase";
import Notification from "@/components/Common/UI/Notification";
import React from "react";

const page = () => {
  return (
    <div>
      <Title variant={2} title={"Modifiers list"} />
      <div>
        <div>
          <p className=" text-white">
            Description for all modifiers which you can use for backlogs
          </p>
          Full list:
          <ul>
            <li>
              <LinkBase href={"#Steam"}>Steam Search</LinkBase>
            </li>
            <li>
              <LinkBase href={"#Tags"}>Tags</LinkBase>
            </li>
            <li>
              <LinkBase href={"#Board"}>Board</LinkBase>
            </li>
          </ul>
        </div>
        <Notification
          text={
            "This section WIP. For now, just temporary - general information about what this modifier does."
          }
          type={"info"}
          options={{ showBtn: false }}
        />
        <Divider />
      </div>

      <ul>
        <li className=" border-b border-border-subtle-1 pb-4 " id="Steam">
          <Title variant={2} title={"Steam Search"} />

          <p>
            Then when you add a new item you will see that the title field has
            changed slightly. Now it works not only as a title, but also as a
            search bar.
          </p>
          <p>
            After entering a query, you can link one of the results In this
            case, the title will be replaced by the game name and the Steam icon
            will be displayed. (To unlink, click on the steam icon)
          </p>
          <p>
            You can save it as is or fill other you own fields Now if you open
            your backlog, you will see information from Steam in the results in
            addition to your own fields
          </p>
        </li>
        <li id="Tags"></li>
        <li id="Board">
          <Title variant={2} title={"Board"} />
          <p>
            Turns your backlog into a board. Allows you to freely move entries
            between categories. And the categories themselves
          </p>
        </li>
      </ul>
    </div>
  );
};

export default page;
