"use client";

import { useState } from "react";
import Row from "../row";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [html, setHtml] = useState<string>();

  return (
    <div className="size-full p-2 space-y-2">
      <Titlearea placeholder="새 페이지" />
      <Row innerHtml={html} setInnerHtml={setHtml} />
    </div>
  );
};

export default Playground;
