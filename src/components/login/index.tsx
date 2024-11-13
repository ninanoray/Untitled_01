"use client";

import { Separator } from "@/src/components/ui/separator";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <div className="screen flex-center flex-col">
      <div className="flex-col">
        <h1>상상하는 무엇이든 만들 수 있어요</h1>
        <h1 className="text-gray-400">계정에 로그인</h1>
        <Separator className="my-6" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
