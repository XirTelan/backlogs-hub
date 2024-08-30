"use client";
import React from "react";
import { BacklogItemPopulated, BacklogItemWithSteamInfo } from "@/zodTypes";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import Accordion from "../Common/UI/Accordion";
import rehypeSanitize from "rehype-sanitize";
import SteamGameCard from "@/containers/SteamGameCard";
import { IoMdCreate } from "react-icons/io";
import { MdOutlineUpdate } from "react-icons/md";

const isHaveSteamData = (
  data: BacklogItemPopulated,
): data is BacklogItemWithSteamInfo => {
  return Object.prototype.hasOwnProperty.call(data, "steamData");
};

type TimeStamp = {
  value: Date | string;
  icon: React.ReactNode;
  title: string;
};
const renderTimeField: (data: TimeStamp) => React.ReactElement = ({
  value,
  icon,
  title,
}) => {
  return (
    <div title={title} className="flex items-center">
      {icon}

      {typeof value === "string"
        ? new Date(value).toDateString()
        : value.toDateString()}
    </div>
  );
};

const BacklogItem = ({
  data,
  hideCategory = false,
}: {
  data: BacklogItemPopulated | BacklogItemWithSteamInfo;
  hideCategory?: boolean;
}) => {
  const Base = () => {
    const timestamps = [
      data.createdAt && {
        value: data.createdAt,
        icon: <IoMdCreate className="mx-2" />,
        title: "Created At",
      },
      data.updatedAt && {
        value: data.updatedAt,
        icon: <MdOutlineUpdate className="mx-2" />,
        title: "Updated At",
      },
    ].filter((f) => f != undefined);

    return (
      <>
        {!hideCategory && (
          <div className=" flex gap-2">
            <div>Category:</div>

            <div className=" text-secondary-text">{data.category}</div>
          </div>
        )}
        <div>
          {data.userFields.map((field, indx) => {
            return withWrap(field, indx, renderFieldValue);
          })}
        </div>
        <div className="flex justify-end text-xs text-secondary-text opacity-50 hover:opacity-100">
          {timestamps?.map((field) => renderTimeField(field as TimeStamp))}
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
