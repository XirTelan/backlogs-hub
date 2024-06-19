"use client";
import React from "react";
import Title from "../Common/Title";
import useSWR from "swr";
import { fetcher } from "@/utils";

const BacklogItem = ({ itemId }: { itemId: string }) => {
  const res = useSWR(`/api/items/${itemId}`, fetcher);
  if (res.isLoading) return <div>Is Loading</div>;
  const { data } = res.data;
  return (
    <div>
      <Title title={`Details "${data.title}"`} />
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
