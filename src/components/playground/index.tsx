"use client";

import { marked } from "marked";
import { ElementType, useState } from "react";
import Row from "../row";
import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const result = marked(textAreaValue || "");

  const [html, setHtml] = useState<string>();

  const parseMarkdown = (markdown: string | undefined) => {
    const regex = /<[^>]*>?/g; // html 태그 정규식
    const gethtmlTagName = (html: string) => {
      const result = html
        .match(regex)
        ?.at(0)
        ?.replace("<", "")
        .replace(">", "");
      if (result) return result as ElementType;
      else return undefined;
    };
    const getContentValue = (html: string) =>
      html.replace(regex, "") || undefined;

    if (markdown) {
      const parsedHtml = marked(markdown);

      if (typeof parsedHtml === "string") {
        return {
          tag: gethtmlTagName(parsedHtml),
          content: getContentValue(parsedHtml),
        };
      } else
        parsedHtml.then((res) => {
          return { tag: gethtmlTagName(res), content: getContentValue(res) };
        });
    } else return { tag: undefined, content: undefined };
  };

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {result}
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: result as string }}
        className="w-full"
      />
      <Textarea
        value={textAreaValue}
        onChange={(e) => {
          const value = e.target.value;
          console.log({ value: value });
          setTextAreaValue(value);
          // setHtml(marked(value) as string);
        }}
        placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
      />
      <Row innerHtml={html} setInnerHtml={setHtml} />
    </div>
  );
};

export default Playground;
