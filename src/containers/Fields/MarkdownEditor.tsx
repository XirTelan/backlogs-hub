import MDEditor from "@uiw/react-md-editor/nohighlight";
import React, { forwardRef, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({ name, defaultValue, setValue, ...props }, ref) => {
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
  },
);
MarkdownEditor.displayName = "MarkdownEditor";
export default MarkdownEditor;

type MarkdownEditorProps = {
  name: string;
  defaultValue: string;
  setValue: (field: string, value: string) => void;
};
