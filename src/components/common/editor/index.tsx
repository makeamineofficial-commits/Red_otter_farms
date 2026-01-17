"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { marked } from "marked";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function Editor({ value, onChange }: Props) {
  const [markdown, setMarkdown] = useState(value);

  const handleChange = async (md?: string) => {
    setMarkdown(md || "");
    const html = await marked(md || "");
    onChange(html);
  };

  return (
    <div className="space-y-2">
      <MDEditor
        value={markdown}
        onChange={handleChange}
        height={400}
        visiableDragbar={false}
        className="bg-white text-black rounded-md"
        textareaProps={{
          className:
            "w-full h-full resize-none p-3 bg-white text-black rounded-md focus:outline-none focus:ring-1 focus:ring-primary",
        }}
      />
    </div>
  );
}
