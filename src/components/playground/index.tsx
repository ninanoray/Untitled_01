"use client";

import { marked } from "marked";
import { ElementType, useCallback, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>();

  const [html, setHtml] = useState<string>();
  const contentEditableRef = useRef<HTMLElement>(null);

  const result = marked(textAreaValue || "");

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

  const addHTMLAttributes = (html: string | undefined) => {
    return html
      ? html.slice(0, html?.indexOf(">")) +
          ` contenteditable placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"` +
          html.slice(html?.indexOf(">"))
      : "";
  };

  const onChangeContents = useCallback((event: ContentEditableEvent) => {
    const regex = /<[^>]*>?/g; // html 태그 정규식

    const value = event.target.value;
    const htmlTag = value
      .match(regex)
      ?.at(0)
      ?.replace("<", "")
      .replace(">", "")
      .split(" ")[0];

    const content = value.replace(/<[^>]*>?/g, "");
    const htmlString = marked(value);

    const cursor = document.getSelection();
    const offset = cursor?.anchorOffset;

    if (typeof htmlString === "string") {
      console.log({
        html: htmlString,
        tag: htmlTag,
        content: content,
        offset: offset,
      });
      if (!htmlTag) {
        setHtml(addHTMLAttributes(htmlString));
      } else if (htmlTag.includes("br")) {
        setHtml(undefined);
      } else {
      }
    }
    // else htmlString.then((res) => setHtml(addHTMLAttributes(res)));
  }, []);

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {result}
      <Textarea
        value={textAreaValue}
        onChange={(e) => {
          const value = e.target.value;
          setTextAreaValue(value);
          // setHtml(marked(value) as string);
        }}
        placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
      />
      <ContentEditable
        placeholder={"글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"}
        html={html || ""}
        innerRef={contentEditableRef}
        onChange={onChangeContents}
        className={
          contentEditableRef.current?.innerText.length === 0
            ? "w-full"
            : "w-full content-[attr(placeholder)] block text-gray-300"
        }
      />
    </div>
  );
};

export default Playground;
