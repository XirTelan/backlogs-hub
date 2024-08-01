"use client";
import React from "react";
import { BacklogItemDTO } from "@/zodTypes";
import MDEditor from "@uiw/react-md-editor/nohighlight";

const BacklogItem = ({ data }: { data: BacklogItemDTO }) => {
  return (
    <div>
      <div className="flex">
        <div>Category:</div>
        <div>{data.category}</div>
      </div>
      <div>
        {data.userFields.map((field, indx) => {
          return (
            <div key={indx} className="flex justify-between">
              <div className="me-2"> {field.backlogFieldId}</div>
              <div>
                {field.type === "markdown" && (
                  <MDEditor.Markdown
                    source={field.value}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                )}
                {field.value ? (
                  field.value
                ) : (
                  <span className=" text-secondary-text">Field empty</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BacklogItem;
