"use client";
import React from "react";
import { BacklogItemDTO } from "@/zodTypes";

const BacklogItem = ({ data }: { data: BacklogItemDTO }) => {
  return (
    <div>
      <div className="flex">
        <div>Category:</div>
        <div>{data.category}</div>
      </div>
      <div>
        {data.userFields.map((field, indx) => (
          <div key={indx} className="flex justify-between">
            <div className="me-2"> {field.name}</div>
            <div>
              {field.value ? (
                field.value
              ) : (
                <span className=" text-secondary-text">Field empty</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BacklogItem;
