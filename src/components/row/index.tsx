import { marked } from "marked";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { twMerge } from "tailwind-merge";

type Props = {
  id: number;
  data: (string | undefined)[];
  setData: Dispatch<SetStateAction<(string | undefined)[]>>;
};

const ADDROW = "Add";
const DELETEROW = "DEL";

const Row = ({ id, data, setData }: Props) => {
  const innerHtml: string | undefined = data[id];
  const setInnerHtml = useCallback(
    (value: string | undefined) => {
      const temp = [...data];
      temp[id] = value;
      setData(temp);
    },
    [data, id, setData]
  );
  const [keycode, setKeyCode] = useState("");

  // string html 태그에 속성 추가
  const addHTMLAttributes = (html: string) => {
    return html
      ? `${html.slice(0, html?.indexOf(">"))} contenteditable="true" placeholder="내용을 입력하세요"${html.slice(html?.indexOf(">"))}`
      : "";
  };

  // html tag 이름 가져오기, 괄호와 속성 제외
  const getHTMLtagName = (html: string) => {
    const regexFirstTag = /<[^>]*>?/; // html 첫번째 태그 정규식
    return html
      .match(regexFirstTag)
      ?.toString()
      .split(" ")[0]
      .replace("<", "")
      .replace(">", "");
  };

  // Row change event
  const onChangeContents = useCallback(
    (event: ContentEditableEvent) => {
      const regexAllTag = /<[^>]*>?/g; // html의 모든 태그 정규식

      const currentHtmlvalue = event.target.value;
      const type = getHTMLtagName(currentHtmlvalue);
      const content = currentHtmlvalue.replace(regexAllTag, "");
      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;
      /*
        1. marked에서 &nbsp와 MD문법이 겹치면 인식을 못하기 때문에 제거
        2. 인용 문법을 '>'에서 '|'로 변경
      */
      const parsedHtml = marked(
        content.replace("&nbsp;", "").replace("|", ">"),
        {
          async: false,
        }
      );

      if (type === "div") {
        // 타입이 div일땐 초기화
        setInnerHtml(undefined);
      } else if (getHTMLtagName(parsedHtml) === "p") {
        // 파싱된 HTML이 p 일땐 파싱 없이 저장
        setInnerHtml(currentHtmlvalue);
      } else if (content.includes("---")) {
        // hr은 속성 없이 파싱
        setInnerHtml(parsedHtml);
      } else if (content.includes("```")) {
        // code이면 속성 추가하여 파싱
        setInnerHtml(addHTMLAttributes(parsedHtml));
      } else if (/&nbsp;$/.test(content)) {
        // 내용의 마지막이 "띄어쓰기"이면 속성 추가하여 파싱
        setInnerHtml(addHTMLAttributes(parsedHtml));
      } else {
        setInnerHtml(currentHtmlvalue);
      }

      console.log({
        tag: type,
        content: currentHtmlvalue,
        offset: offset,
      });
    },
    [setInnerHtml]
  );

  // Row 키입력 이벤트
  const handleKeydown = useCallback(
    (e: KeyboardEvent<HTMLElement>, id: number) => {
      if (!data || !setData || e.nativeEvent.isComposing) {
        return;
      } else {
        if (e.currentTarget === e.target) {
          const code = e.code.toLowerCase();
          if (code === "enter") {
            e.preventDefault();
            setKeyCode(ADDROW);
          } else if (code === "backspace") {
            const text = e.currentTarget.innerText;
            const cursor = document.getSelection();
            const offset = cursor?.anchorOffset;
            if (offset === 0 && text === "") setKeyCode(DELETEROW);
          }
        }
      }
    },
    [data, setData]
  );

  // 현재 커서 위치 다음에 Row 추가
  const addRow = useCallback(
    (id: number) => {
      const start = data.slice(0, id + 1);
      const end = data.slice(id + 1);
      const insert = [...start, undefined, ...end];
      console.log(start);
      console.log(id, insert);
      // setData([...data, undefined]);
      setData(insert);
      setKeyCode("");
    },
    [data, setData]
  );

  // 현재 커서 위치 Row 삭제
  const deleteRow = useCallback(
    (id: number) => {
      if (data.length > 1) setData(data.filter((_, i) => i !== id));
      setKeyCode("");
    },
    [data, setData]
  );

  // 키입력 업데이트
  useEffect(() => {
    if (keycode === ADDROW) setTimeout(() => addRow(id), 0);
    else if (keycode.includes(DELETEROW)) {
      setTimeout(() => deleteRow(id), 0);
    }
  }, [addRow, deleteRow, id, keycode]);

  const placeholderStyle = "content-[attr(placeholder)]";
  const hrStyle = "";
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
        html={innerHtml || ""}
        onChange={onChangeContents}
        onKeyDown={(e) => handleKeydown(e, id)}
        placeholder={"글을 작성하거나 마크다운 텍스트를 입력하세요"}
        className={twMerge(
          `w-full space-y-2`,
          innerHtml
            ? twMerge(
                hrStyle,
                ulStyle,
                olStyle,
                liStyle,
                codeStyle,
                blockquoteStyle
              )
            : placeholderStyle
        )}
      />
    </div>
  );
};

export default Row;
