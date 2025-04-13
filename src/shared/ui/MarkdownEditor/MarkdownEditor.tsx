"use client";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import React, { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export const MarkdownEditor = ({
  name,
  defaultValue,
  setValue,
  ref,
  ...props
}: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(defaultValue);

  useEffect(() => {
    setValue(name, markdown);
  }, [name, setValue, markdown]);

  const onChange = (value: string | undefined) => {
    setMarkdown(value || "");
  };

  return (
    <div ref={ref}>
      <input aria-hidden {...props} className="hidden"></input>
      <MDEditor
        value={markdown}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onChange={onChange}
      />
    </div>
  );
};

type MarkdownEditorProps = {
  name: string;
  defaultValue: string;
  setValue: (field: string, value: string) => void;
} & React.ComponentProps<"div">;
