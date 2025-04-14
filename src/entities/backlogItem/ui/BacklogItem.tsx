"use client";
import React from "react";

import MDEditor from "@uiw/react-md-editor/nohighlight";
import rehypeSanitize from "rehype-sanitize";
import SteamGameCard from "@/entities/backlogItem/ui/SteamGameCard";
import { IoMdCreate } from "react-icons/io";
import { MdOutlineUpdate } from "react-icons/md";
import {
  BacklogItemPopUserField,
  BacklogItemPopulated,
  BacklogItemWithSteamInfo,
} from "@/shared/model";
import { Accordion } from "@/shared/ui";

type TimeStamp = {
  value: Date | string;
  icon: React.ReactNode;
  title: string;
};

type WrapperProps = {
  field: BacklogItemPopUserField;
  indx: number;
  renderField: (field: BacklogItemPopUserField) => React.ReactNode;
};

export const BacklogItem = ({
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
          <div className=" my-2 flex gap-2">
            <div>Category:</div>

            <div className=" text-text-secondary">{data.category}</div>
          </div>
        )}
        <div className=" *:border-t *:border-border-subtle-1 *:py-4 ">
          {data.userFields.map((field, indx) => {
            return withWrap({ field, indx, renderField: renderFieldValue });
          })}
        </div>
        <div className="flex justify-end text-xs text-text-secondary opacity-50 hover:opacity-100">
          {timestamps?.map((field) => renderTimeField(field as TimeStamp))}
        </div>
      </>
    );
  };
  //[TODO] Stean card shoud not be here .
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

const isHaveSteamData = (
  data: BacklogItemPopulated
): data is BacklogItemWithSteamInfo => {
  return Object.prototype.hasOwnProperty.call(data, "steamData");
};

const renderFieldValue = (field: BacklogItemPopUserField) => {
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
      <span className=" text-text-secondary">Field empty</span>
    );
  }
};

const renderTimeField: (data: TimeStamp) => React.ReactElement = ({
  value,
  icon,
  title,
}) => {
  return (
    <div key={title} title={title} className="flex items-center">
      {icon}

      {typeof value === "string"
        ? new Date(value).toDateString()
        : value.toDateString()}
    </div>
  );
};

const withWrap = ({ field, indx, renderField }: WrapperProps) => {
  switch (field.type) {
    case "markdown": {
      return (
        <Accordion key={indx} id={field.backlogFieldId} title={field.title}>
          {renderField(field)}
        </Accordion>
      );
    }
    default: {
      return (
        <div key={indx} className="flex justify-between">
          <div className="me-2"> {field.title}</div>
          <div> {renderField(field)}</div>
        </div>
      );
    }
  }
};
