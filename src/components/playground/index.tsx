"use client";

import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import Row from "../row";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [htmlData, setHtmlData] = useState<(string | undefined)[]>([undefined]);
  const [keycode, setKeyCode] = useState("");

  const addRow = useCallback(() => {
    setHtmlData([...htmlData, undefined]);
    setKeyCode("");
  }, [htmlData]);

  const subtractRow = useCallback(
    (index: number) => {
      if (htmlData.length > 1)
        setHtmlData(htmlData.filter((_, i) => i !== index));
      setKeyCode("");
    },
    [htmlData]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent<HTMLElement>, index: number) => {
      if (e.currentTarget === e.target && e.nativeEvent.isComposing === false) {
        const code = e.code.toLowerCase();
        if (code === "enter") {
          e.preventDefault();
          setKeyCode("Add");
        } else if (code === "backspace") {
          const text = e.currentTarget.innerText;
          const cursor = document.getSelection();
          const offset = cursor?.anchorOffset;
          if (offset === 0 && text === "") setKeyCode(`Sub${index}`);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (keycode === "Add") setTimeout(() => addRow(), 0);
    else if (keycode.includes("Sub"))
      setTimeout(() => subtractRow(Number(keycode.replace("Sub", ""))), 0);
  }, [addRow, keycode, subtractRow]);

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
