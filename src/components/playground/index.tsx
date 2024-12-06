"use client";

import { useCallback, useEffect, useState } from "react";
import Row from "../row";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [htmlData, setHtmlData] = useState<(string | undefined)[]>([undefined]);

  const addRow = useCallback(() => {
    setHtmlData([...htmlData, undefined]);
  }, [htmlData]);

  const subtractRow = useCallback(() => {
    if (htmlData.length > 1) {
      const temp = htmlData.slice(0, -1);
      setHtmlData(temp);
    }
  }, [htmlData]);

  useEffect(() => console.log(htmlData), [htmlData]);

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
          addRow={addRow}
          subtractRow={() => {
            if (!html) subtractRow();
          }}
        />
      ))}
    </div>
  );
};

export default Playground;
