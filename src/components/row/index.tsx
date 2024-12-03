import { marked } from "marked";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { twMerge } from "tailwind-merge";

type Props = {
  innerHtml: string | undefined;
  setInnerHtml: Dispatch<SetStateAction<string | undefined>>;
};

const Row = ({ innerHtml, setInnerHtml }: Props) => {
  const contentEditableRef = useRef<HTMLElement>(null);

  const addHTMLAttributes = (html: string | undefined) => {
    return html
      ? `${html.slice(0, html?.indexOf(">"))} contenteditable placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"${html.slice(html?.indexOf(">"))}`
      : "";
  };

  const onChangeContents = useCallback(
    (event: ContentEditableEvent) => {
      const regex = /<[^>]*>?/g; // html 태그 정규식

      const value = event.target.value;
      const htmlTag = value
        .match(regex)
        ?.at(0)
        ?.replace("<", "")
        .replace(">", "")
        .split(" ")[0];

      const content = value.replace(/<[^>]*>?/g, "").replace("|", ">");
      const htmlString = marked(content);

      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;

      console.log({
        value: value,
        html: htmlString,
        tag: htmlTag,
        content: content,
        offset: offset,
      });
      if (!htmlTag) {
        if (typeof htmlString === "string")
          setInnerHtml(addHTMLAttributes(htmlString));
        // else htmlString.then((res) => setInnerHtml(addHTMLAttributes(res)));
      } else if (htmlTag.includes("br")) {
        setInnerHtml(undefined);
      } else if (htmlTag.includes("div")) {
        setInnerHtml(undefined);
      }
    },
    [setInnerHtml]
  );

  const placeholderStyle = "content-[attr(placeholder)]";
  const ulStyle = "[&_ul]:list-disc";
  const olStyle = "[&_ol]:list-decimal";
  const codeStyle =
    "[&_code]:px-2 [&_code]:py-1 [&_code]:my-2 [&_code]:bg-stone-100 [&_code]:text-red-500 [&_code]:rounded-lg";
  const blockquoteStyle =
    "[&_blockquote]:min-h-[3em] [&_blockquote]:px-6 [&_blockquote]:py-3 [&_blockquote]:my-4 [&_blockquote]:bg-gray-50 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:text-lg [&_blockquote]:font-medium";

  return (
    <div className="w-full mx-3">
      <ContentEditable
        placeholder={"글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"}
        html={innerHtml || ""}
        onChange={onChangeContents}
        className={
          innerHtml
            ? twMerge(ulStyle, olStyle, codeStyle, blockquoteStyle)
            : placeholderStyle
        }
      />
    </div>
  );
};

export default Row;
