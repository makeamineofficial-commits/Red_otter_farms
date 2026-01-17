"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (html: string) => void;
};

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

export function Editor({ value, onChange }: Props) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (value) {
      const md = turndown.turndown(value);
      setMarkdown(md);
    }
  }, [value]);

  const handleChange = async (md?: string) => {
    const safeMd = md || "";
    setMarkdown(safeMd);

    const html = await marked.parse(safeMd);
    onChange(html);
  };

  return (
    <div className="space-y-2 rounded-md border bg-card">
      <MDEditor
        value={markdown}
        onChange={handleChange}
        height={400}
        visiableDragbar={false}
        className="bg-card text-foreground"
        textareaProps={{
          className:
            "w-full h-full resize-none p-3 bg-card text-foreground focus:outline-none",
        }}
      />
    </div>
  );
}
