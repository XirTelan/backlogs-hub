"use client";

import MDEditor from "@uiw/react-md-editor";
import React from "react";
import Accordion from "./Common/UI/Accordion";
import { NewsType } from "@/zodTypes";
import rehypeSanitize from "rehype-sanitize";

const UpdatesList = ({ data }: { data: NewsType[] }) => {
  if (!data || data.length === 0) return <div>Updates doesnot found</div>;
  let theme = "dark";
  if (typeof window !== "undefined") {
    theme = localStorage.getItem("theme") ?? "dark";
  }
  return (
    <div data-color-mode={theme}>
      {data.map((news, indx) => (
        <Accordion
          defaultState={indx === 0 ? true : false}
          key={news.title}
          id={news.title}
          title={news.title}
        >
          <MDEditor.Markdown
            rehypePlugins={[rehypeSanitize]}
            className="flex-1"
            source={news.text}
          />
        </Accordion>
      ))}
    </div>
  );
};

export default UpdatesList;
