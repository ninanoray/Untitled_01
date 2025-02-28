import { marked } from "marked";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ContentEditableEvent } from "react-contenteditable";
import MarkdownContenteditable from "./MarkdownContenteditable";

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

  const [tag, setTag] = useState<string>("p");
  const DEFAULT_TAG = "p";
  const [keycode, setKeyCode] = useState("");

  // string html 태그에 속성 추가
  const addHTMLAttributes = (html: string) => {
    return html
      ? `${html.slice(0, html?.indexOf(">"))} contenteditable="true" placeholder="내용을 입력하세요"${html.slice(html?.indexOf(">"))}`
      : "";
  };

  // Row change event
  const onChangeContents = useCallback(
    (event: ContentEditableEvent) => {
      const regexAllTag = /<[^>]*>?/g; // html의 모든 태그 정규식

      const currentOriginValue = event.target.value;
      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;

      // html tag 이름 가져오기, 괄호와 속성 제외
      const getHTMLtagsName = (html: string) => {
        const allTags = html.match(regexAllTag);
        const headTags = allTags?.filter((tag) => !tag.includes("/"));
        const headTagNames = headTags?.map((tag) =>
          tag.replace("<", "").replace(">", "")
        );
        return headTagNames || [];
      };

      const parseToHtml = (value: string) => {
        const mdToHtml = marked(value.replace("&nbsp;", "").replace("|", ">"), {
          async: false,
        });
        return mdToHtml.replaceAll("\n", "");
      };

      const content = currentOriginValue.replace(regexAllTag, "");
      const htmlString = parseToHtml(currentOriginValue);
      const tags = getHTMLtagsName(htmlString);

      const typeTag = tags[0] || DEFAULT_TAG;

      if (tags.length > 1) {
        if (tag === DEFAULT_TAG) setTag(typeTag);
        // pre 태그 감지
        if (tags.includes("pre"))
          setInnerHtml(
            addHTMLAttributes(htmlString.replace(/<(\/?)(pre)>/gi, ""))
          );
        // type이 "pre" 일때
        else if (tag === "pre")
          addHTMLAttributes(htmlString.replace(/<(\/?)(p)>/gi, ""));
        else setInnerHtml(htmlString.replace(/<(\/?)(ul|ol)>/gi, ""));
      } else if (tags.length === 1) {
        if (tag === DEFAULT_TAG) {
          setTag(typeTag);
        } else {
          if (["ul", "ol", "pre"].includes(tag)) setInnerHtml(htmlString);
          else setInnerHtml(content);
        }
      } else {
        setTag(DEFAULT_TAG);
        setInnerHtml(undefined);
      }

      console.log({
        type: tag,
        origin: currentOriginValue,
        tags: tags,
        content: content,
      });
    },
    [setInnerHtml, tag]
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

  const moveFocus = useCallback((targetId: number) => {
    const contentsHtml = document.getElementById(`${targetId}`);
    if (contentsHtml) {
      const focusTargetHtml = contentsHtml.firstElementChild as HTMLElement;
      focusTargetHtml.focus();
    } else {
      console.error(`Can't find row ${targetId}`);
    }
  }, []);

  // 현재 커서 위치 다음에 Row 추가
  const addRow = useCallback(
    (id: number) => {
      const start = data.slice(0, id + 1);
      const end = data.slice(id + 1);
      const insert = [...start, undefined, ...end];
      moveFocus(id + 1);
      setData(insert);
      setKeyCode("");
    },
    [data, moveFocus, setData]
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

  return (
    <MarkdownContenteditable
      autoFocus
      tabIndex={0}
      html={innerHtml}
      tagName={tag}
      onChange={onChangeContents}
      // onKeyDown={(e) => handleKeydown(e, id)}
    />
  );
};

export default Row;
