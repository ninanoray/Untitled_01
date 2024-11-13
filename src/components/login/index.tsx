import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const Login = () => {
  return (
    <div className="screen flex-center flex-col">
      <div className="flex-col">
        <h1>상상하는 무엇이든 만들 수 있어요</h1>
        <h1 className="text-gray-400">계정에 로그인</h1>
        <Separator className="my-6" />
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일 주소를 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
