"use client";

import { GoogleSVG } from "@/src/app/svg";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "../../ui/button";
import FormSetLogin from "./formSetLogin";
import { useIsMobile } from "@/src/hooks/use-mobile";

const Login = () => {
  const isMobile = useIsMobile();
  if (isMobile)
    return (
      <div className="mscreen flex-center flex-col">
        <div className="flex-col whitespace-nowrap">
          <h2>상상하는 무엇이든 만들 수 있어요</h2>
          <h2 className="text-gray-400 mb-8">Untitled_01 계정에 로그인</h2>
          <Button variant="outline" className="w-full my-2">
            <GoogleSVG />
            Google 계정으로 계속하기
          </Button>
          <Separator className="my-4" />
          <FormSetLogin />
        </div>
      </div>
    );
  else
    return (
      <div className="screen flex-center flex-col">
        <div className="flex-col whitespace-nowrap">
          <h1>상상하는 무엇이든 만들 수 있어요</h1>
          <h1 className="text-gray-400 mb-8">Untitled_01 계정에 로그인</h1>
          <Button variant="outline" className="w-full my-2">
            <GoogleSVG />
            Google 계정으로 계속하기
          </Button>
          <Separator className="my-4" />
          <FormSetLogin />
        </div>
      </div>
    );
};

export default Login;
