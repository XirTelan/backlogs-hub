"use client";
import React from "react";
import { BacklogItemPopulated, BacklogItemWithSteamInfo } from "@/zodTypes";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import Accordion from "../Common/UI/Accordion";
import rehypeSanitize from "rehype-sanitize";
import SteamGameCard from "@/containers/SteamGameCard";

const isHaveSteamData = (
  data: BacklogItemPopulated,
): data is BacklogItemWithSteamInfo => {
  return Object.prototype.hasOwnProperty.call(data, "steamData");
};

const BacklogItem = ({
  data,
}: {
  data: BacklogItemPopulated | BacklogItemWithSteamInfo;
}) => {
  const Base = () => {
    return (
      <>
        <div className="flex">
          <div>Category:</div>
          <div>{data.category}</div>
        </div>
        <div>
          {data.userFields.map((field, indx) => {
            return withWrap(field, indx, renderFieldValue);
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      {isHaveSteamData(data) ? (
        <div>
          <SteamGameCard data={data.steamData}>
            <div className="m-2 bg-neutral-950/50 p-2 ">
              <Base />
            </div>
          </SteamGameCard>
        </div>
      ) : (
        <Base />
      )}
    </div>
  );
};

export default BacklogItem;

const renderFieldValue = (field: {
  backlogFieldId: string;
  type: string;
  value: string;
}) => {
  if (field.type === "markdown") {
    return (
      <MDEditor.Markdown
        className="flex-1"
        rehypePlugins={[rehypeSanitize]}
        source={field.value}
      />
    );
  } else {
    return field.value ? (
      field.value
    ) : (
      <span className=" text-secondary-text">Field empty</span>
    );
  }
};

type RenderField = {
  backlogFieldId: string;
  type: string;
  value: string;
};
const withWrap = (
  field: {
    backlogFieldId: string;
    type: string;
    value: string;
  },
  indx: number,
  renderField: (field: RenderField) => React.ReactNode,
) => {
  if (["markdown", "text"].includes(field.type)) {
    return (
      <Accordion
        key={indx}
        id={field.backlogFieldId}
        title={field.backlogFieldId}
      >
        {renderField(field)}
      </Accordion>
    );
  }

  return (
    <div key={indx} className="flex justify-between">
      <div className="me-2"> {field.backlogFieldId}</div>
      <div> {renderField(field)}</div>
    </div>
  );
};
