import { marked } from "marked";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { twMerge } from "tailwind-merge";

type Props = {
  innerHtml: string | undefined;
  setInnerHtml: Dispatch<SetStateAction<string | undefined>>;
};

const Row = ({ innerHtml, setInnerHtml }: Props) => {
  const [hasContent, setHasContent] = useState<boolean>(false);

  const contentEditableRef = useRef<HTMLElement>(null);

  const addHTMLAttributes = (html: string) => {
    // const regexOpenTag = /<[a-z]+[^>]*/g;
    // const regexCloseTag = /<\/+[^>]*>?/g;
    // const openTags = html.match(regexOpenTag);
    // const editedOpenTags = openTags?.map((tag, index) => {
    //   if (index !== openTags.length - 1) return `${tag}>`;
    //   else
    //     return `${tag} contenteditable="true" placeholder="내용을 입력하세요">`;
    // });
    // const closeTags = html.match(regexCloseTag) || "";
    // const content =
    //   html
    //     .match(/(?<=\>)(.*?)(?=\<)/g)
    //     ?.toString()
    //     .replace(",", "") || "";

    // const result = `${editedOpenTags?.toString().replace(",", "")}${content}${closeTags?.toString().replace(",", "")}`;
    //   return result;
    return html
      ? `${html.slice(0, html?.indexOf(">"))} contenteditable="true" placeholder="내용을 입력하세요"${html.slice(html?.indexOf(">"))}`
      : "";
  };

  const getHTMLtagName = (html: string) => {
    const regex = /<[^>]*>?/g; // html 태그 정규식
    return html
      .match(regex)
      ?.at(0)
      ?.replace("<", "")
      .replace(">", "")
      .split(" ")[0];
  };

  const onChangeContents = useCallback(
    (event: ContentEditableEvent) => {
      const innerHtmlvalue = event.target.value;
      const type = getHTMLtagName(innerHtmlvalue);

      const content = innerHtmlvalue.replace(/<[^>]*>?/g, "").replace("|", ">");
      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;

      console.log({
        innerHtml: innerHtmlvalue,
        type: type,
        content: content,
        offset: offset,
      });

      if (!type) {
        setInnerHtml(undefined);
        const parsedHtml = marked(content.replace("&nbsp;", ""), {
          async: false,
        });
        console.log(parsedHtml);
        if (
          (getHTMLtagName(parsedHtml) !== "p" && /&nbsp;$/.test(content)) ||
          content.includes("```") ||
          content.includes("---")
        ) {
          setInnerHtml(addHTMLAttributes(parsedHtml));
          setHasContent(!!content);
        }
      } else if (type.includes("div")) {
        setInnerHtml(undefined);
      }
    },
    [setInnerHtml, setHasContent]
  );

  const placeholderStyle = "content-[attr(placeholder)]";
  const ulStyle = "[&_ul]:list-disc marker:text-black";
  const olStyle = "[&_ol]:list-decimal marker:text-black";
  const liStyle = "[&_li]:ml-5";
  const codeStyle =
    "[&_pre]:w-full [&_pre]:min-h-[1em] [&_pre]:px-4 [&_pre]:py-3 [&_pre]:bg-stone-100 [&_code]:break-all [&_code]:whitespace-break-spaces";
  const inlineCodeStyle =
    "[&_code]:px-2 [&_code]:py-1 [&_code]:my-2 [&_code]:bg-stone-100 [&_code]:text-red-500 [&_code]:rounded-lg";
  const blockquoteStyle =
    "[&_blockquote]:w-full [&_blockquote]:min-h-[3em] [&_blockquote]:px-6 [&_blockquote]:py-3 [&_blockquote]:my-4 [&_blockquote]:bg-gray-50 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:text-lg [&_blockquote]:font-medium";

  return (
    <div className="w-full px-3">
      <ContentEditable
        placeholder={"글을 작성하거나 마크다운 텍스트를 입력하세요"}
        html={innerHtml || ""}
        onChange={onChangeContents}
        className={twMerge(
          `w-full`,
          innerHtml
            ? twMerge(ulStyle, olStyle, liStyle, codeStyle, blockquoteStyle)
            : placeholderStyle
        )}
      />
    </div>
  );
};

export default Row;
