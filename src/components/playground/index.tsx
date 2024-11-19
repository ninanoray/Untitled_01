import { Textarea } from "../ui/textarea";
import { Titlearea } from "../ui/titlearea";

const Playground = () => {
  return (
    <div className="size-full p-2 space-y-4">
      <Titlearea placeholder="새 페이지" />
      <Textarea placeholder="글을 작성하거나 명령어를 사용하려면 '/' 키를 누르세요" />
    </div>
  );
};

export default Playground;
