"use client";

import { useIsMobile } from "@/src/hooks/use-mobile";
import SignupForm from "./signupForm";

const Signup = () => {
  const isMobile = useIsMobile();
  if (isMobile)
    return (
      <div className="mscreen flex-center flex-col">
        <div className="flex-center flex-col whitespace-nowrap">
          <h2>프로필 만들기</h2>
          <h2 className="text-gray-400 mb-8">
            사용자 계정 정보를 입력해주세요
          </h2>
          <SignupForm />
        </div>
      </div>
    );
  else
    return (
      <div className="screen flex-center flex-col">
        <div className="flex-center flex-col whitespace-nowrap">
          <h1>프로필 만들기</h1>
          <h1 className="text-gray-400 mb-8">
            사용자 계정 정보를 입력해주세요
          </h1>
          <SignupForm />
        </div>
      </div>
    );
};

export default Signup;
