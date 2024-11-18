"use client";

import { GoogleSVG } from "@/src/app/svg";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "../../ui/button";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <div className="screen flex-center flex-col">
      <div className="flex-col">
        <h1>상상하는 무엇이든 만들 수 있어요</h1>
        <h1 className="text-gray-400 mb-8">Untitled_01 계정에 로그인</h1>
        <Button variant="outline" className="w-full my-2">
          <GoogleSVG />
          Google 계정으로 계속하기
        </Button>
        <Separator className="my-4" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
