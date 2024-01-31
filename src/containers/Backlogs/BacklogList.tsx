"use client";
import React, { useEffect, useState } from "react";
import { backlogs } from "../../../mock/data";

export default function Backloglist({ backlogId, addItem }: BackloglistProps) {
  const [categories, setCategories] = useState<string[] | null>(null);
  const [itemsList, setItemList] = useState<any[]>([]); //todo

  useEffect(() => {
    const res = backlogs.find((item) => item.title === backlogId);
    if (res?.categories) setCategories(res.categories);
    if (res?.data) setItemList(res?.data);
  }, [backlogId]);

  return (
    <>
      <div className="flex gap-1">
        <input className=" bg-slate-900" placeholder="Search Game" />
        <button
          onClick={() => {
            addItem();
          }}
        >
          Add
        </button>
        <div className="flex gap-1">
          {categories && categories.map((item) => <div key={item}>{item}</div>)}
        </div>
      </div>
      <div>
        {itemsList.map((item) => (
          <div key={item.title}>{item.title}</div>
        ))}
      </div>
    </>
  );
}

interface BackloglistProps {
  backlogId: string;
  addItem: () => void;
}
