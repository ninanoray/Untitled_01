"use client";

import { useState } from "react";
import Row from "../row";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  const [rows, setRows] = useState<(string | undefined)[]>([undefined]);

  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      {rows.map((_, index) => (
        <Row key={index} id={index} data={rows} setData={setRows} />
      ))}
    </div>
  );
};

export default Playground;
