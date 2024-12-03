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

      const innerHtmlvalue = event.target.value;
      const type = innerHtmlvalue
        .match(regex)
        ?.at(0)
        ?.replace("<", "")
        .replace(">", "")
        .split(" ")[0];
      const content = innerHtmlvalue.replace(/<[^>]*>?/g, "").replace("|", ">");
      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;

      console.log({
        innerHtml: innerHtmlvalue,
        type: type,
        content: content,
        offset: offset,
      });

      if (
        content.includes(" ") ||
        content.includes("```") ||
        content.includes("---")
      ) {
        const parsedHtml = marked(content, { async: false });
        console.log(parsedHtml);
        if (!type) setInnerHtml(addHTMLAttributes(parsedHtml));
        else if (type.includes("br") || type.includes("div")) {
          setInnerHtml(undefined);
        }
      } else if (!content) setInnerHtml(undefined);
    },
    [setInnerHtml]
  );

  const placeholderStyle = "w-fit content-[attr(placeholder)]";
  const ulStyle = "[&_ul]:list-disc";
  const olStyle = "[&_ol]:list-decimal ";
  const liStyle = "[&_li]:my-2 [&_li]:ml-6";
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
            ? twMerge(ulStyle, olStyle, liStyle, codeStyle, blockquoteStyle)
            : placeholderStyle
        }
      />
    </div>
  );
};

export default Row;
