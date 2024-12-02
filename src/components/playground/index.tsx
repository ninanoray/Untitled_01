"use client";

import { marked } from "marked";
import {
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";
import Polymorphic from "./polymorphicComponent";

const Playground = () => {
  const [html, setHtml] = useState<string>();
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const [poly, setPoly] = useState<string>();
  const result = marked(html || "");
  const contentEditableRef = useRef<HTMLElement>(null);
  const polymorphicRef = useRef<HTMLElement>(null);

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

  const onChangeContents = useCallback((event: ContentEditableEvent) => {
    const html = event.target.value;
    const innerText = contentEditableRef.current?.innerText;
    const content = event.target.value.replace(/<[^>]*>?/g, "");
    const regex = /<[^>]*>?/g; // html 태그 정규식
    const htmlTag = event.target.value
      .match(regex)
      ?.at(0)
      ?.replace("<", "")
      .replace(">", "");

    const cursor = document.getSelection();
    const offset = cursor?.anchorOffset;

    if (!(html === "" && innerText === "" && offset === 0)) {
      const result = marked(html);
      if (typeof result === "string") setHtml(result);
      else result.then((res) => setHtml(res));
    }
  }, []);

  const data = useMemo(() => parseMarkdown(poly), [poly]);

  useEffect(() => {
    console.log(contentEditableRef.current);
  }, [contentEditableRef]);

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {result}
      {/* <div dangerouslySetInnerHTML={{ __html: result }}></div> */}
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
      <Textarea
        value={textAreaValue}
        onChange={(e) => {
          const value = e.target.value;
          setTextAreaValue(e.target.value);
          setHtml(marked(value) as string);
          if (contentEditableRef.current) {
            [...contentEditableRef.current.children].map((child) => {
              child.setAttribute("contentEditable", "true");
              child.setAttribute(
                "placeholder",
                "글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
              );
              child.className =
                "w-full inline-block cursor-text empty:after:content-[attr(placeholder)] empty:block empty:text-gray-300";
              console.log(
                html?.slice(0, html?.indexOf(">")) +
                  ` class="w-full inline-block cursor-text empty:after:content-[attr(placeholder)] empty:block empty:text-gray-300"` +
                  html?.slice(html?.indexOf(">"))
              );
            });
          }
        }}
        placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
      />
      <Polymorphic
        ref={polymorphicRef}
        value={poly}
        onInput={(e) => setPoly(e.currentTarget.innerText)}
        as={data?.tag}
      >
        {data?.content}
      </Polymorphic>

      {/* <Polymorphic as="h1" />
      <Polymorphic as="h1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Polymorphic>
      <Polymorphic as="h2" className="w-full">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Polymorphic>
      <Polymorphic as="h3" className="w-full">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Polymorphic>
      <Polymorphic as="ul" className="w-full">
        <li>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </li>
      </Polymorphic>
      <Polymorphic as="ol" className="w-full">
        <li>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </li>
      </Polymorphic>
      <Polymorphic as="code">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Polymorphic>
      <Polymorphic as="blockquote" className="w-full">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Polymorphic> */}
    </div>
  );
};

export default Playground;
