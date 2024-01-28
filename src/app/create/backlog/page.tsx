"use client";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const CreateBacklog = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [formData, setFormData] = useState(null);
  const onSubmit = async (e) => {
    const res = await fetch("/api/backlogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) redirect("/");
  };
  return <div>Page</div>;
};
export default CreateBacklog;
