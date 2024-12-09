"use client";

import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import Row from "../row";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [htmlData, setHtmlData] = useState<(string | undefined)[]>([undefined]);
  const [code, setCode] = useState("");

  const addRow = useCallback(() => {
    setHtmlData([...htmlData, undefined]);
    setCode("");
  }, [htmlData]);

  const subtractRow = useCallback(
    (index: number) => {
      if (htmlData.length > 1)
        setHtmlData(htmlData.filter((_, i) => i !== index));
    },
    [htmlData]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent<HTMLElement>, index: number) => {
      if (e.currentTarget === e.target && e.nativeEvent.isComposing === false) {
        const code = e.code.toLowerCase();
        if (code === "enter") {
          e.preventDefault();
          setCode("Add");
        } else if (code === "backspace") {
          const text = e.currentTarget.innerText;
          const cursor = document.getSelection();
          const offset = cursor?.anchorOffset;
          // setCode("Sub");
          setCode("");
          if (offset === 0 && text === "") subtractRow(index);
        } else setCode("");
      }
    },
    [subtractRow]
  );

  useEffect(() => {
    if (code === "Add") setTimeout(() => addRow(), 0);
    // else if (code === "Sub") setTimeout(() => subtractRow(), 0);
  }, [addRow, code, subtractRow]);

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {htmlData.map((html, index) => (
        <Row
          key={index}
          innerHtml={html}
          setInnerHtml={(value: string | undefined) => {
            const temp = [...htmlData];
            temp[index] = value;
            setHtmlData(temp);
          }}
          onKeydown={(e) => handleKeydown(e, index)}
        />
      ))}
    </div>
  );
};

export default Playground;
