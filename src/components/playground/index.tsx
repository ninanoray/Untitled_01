"use client";

import { marked } from "marked";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [content, setContent] = useState<string>("");
  const result = marked(content);
  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {result}
      {/* <div dangerouslySetInnerHTML={{ __html: result }}></div> */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter {...props} language={match[1]} PreTag="div">
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                {...props}
                className={`${className} px-3 py-1 rounded-md text-red-600 bg-stone-100`}
              >
                {children}
              </code>
            );
          },
          img: (image) => (
            <Image
              src={image.src || ""}
              alt={image.alt || ""}
              width={500}
              height={350}
            />
          ),
          ul({ className, ...props }) {
            return (
              <ul {...props} className={`${className} list-disc list-inside`} />
            );
          },
          ol({ className, ...props }) {
            return (
              <ol
                {...props}
                className={`${className} list-decimal list-inside`}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
      />
    </div>
  );
};

export default Playground;
