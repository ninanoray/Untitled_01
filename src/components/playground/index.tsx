"use client";

import { marked } from "marked";
import { useCallback, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";
import Mutable from "./mutableButton";

const Playground = () => {
  const [content, setContent] = useState<string>("");
  const result = marked(content);
  const contentEditableRef = useRef<HTMLElement>(null);

  const changeBlockContent = useCallback(
    (value: string) => {
      const cursor = document.getSelection();
      const offset = cursor?.anchorOffset;
      if (!(content === "" && offset === 0 && value === "")) setContent(value);
    },
    [content]
  );

  const onChangeContents = useCallback(
    (event: ContentEditableEvent) => {
      const value = event.target.value;
      changeBlockContent(value);
    },
    [content, contentEditableRef]
  );

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {result}
      {/* <div dangerouslySetInnerHTML={{ __html: result }}></div> */}
      <ContentEditable
        placeholder={"글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"}
        html={result as string}
        innerRef={contentEditableRef}
        onChange={onChangeContents}
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요"
      />
      <Mutable as="button">{"안"}</Mutable>
    </div>
  );
};

export default Playground;
