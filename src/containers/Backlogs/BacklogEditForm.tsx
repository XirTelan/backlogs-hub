"use client";
import { BacklogDTO } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";

const BacklogEditForm = ({ id }: { id: string }) => {
  const [data, setData] = useState<BacklogDTO>();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/backlogs/${id}`);
      const data: BacklogDTO = await res.json();
      setData(data);
    };
    loadData();
  }, [id]);

  const onSubmit: SubmitHandler<BacklogDTO> = async (data) => {
    if (data._id) {
      data._id;
    }
    const res = await fetch(`/api/backlogs/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/");
  };

  if (!data) return <div>Loading</div>;
  return (
    <div>
      <h1>Editing backlog &quot;{data.backlogTitle}&quot;</h1>
      <BacklogForm defaultValues={data} onSubmit={onSubmit} />
    </div>
  );
};

export default BacklogEditForm;
