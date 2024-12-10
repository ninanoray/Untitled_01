import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import {
  emailFormSchema,
  loginFormSchema,
  pinFormSchema,
} from "./loginFormSchema";
import axiosInstance from "@/src/lib/apiAxiosInterceptors";
import { setLogger, useMutation, useQueryClient } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  EMAIL_BLOCKED,
  EMAIL_CHECKED,
  EMAIL_LOGIN,
  EMAIL_NEW,
} from "@/src/constant/apiResponseCode";

const STEP_CHECK = 0;
const STEP_PASSWORD = 1;
const STEP_PIN = 2;

export const emailKeys = {
  all: ["email"] as const,
  code: () => [...emailKeys.all, "code"] as const,
};

const LoginForm = () => {
  const [loginMode, setLoginMode] = useState<number>(STEP_CHECK);
  const [pinCount, setPinCount] = useState<number>(30);

  const router = useRouter();

  const formEmail = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const formLogin = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const formPin = useForm<z.infer<typeof pinFormSchema>>({
    resolver: zodResolver(pinFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // 이메일 체크 요청
  const queryClient = useQueryClient();
  type APIResponse = {
    code?: string;
    data?: any;
    message?: string;
    status?: number;
  };
  const checkEmail = useMutation<
    AxiosResponse,
    AxiosError,
    z.infer<typeof emailFormSchema>
  >({
    mutationFn: async (body) => {
      // console log 출력 관리
      setLogger({
        log: () => {},
        warn: () => {},
        error: () => {},
      });
      return await axiosInstance.post("/api/auth/validate-email", body);
    },
    onSuccess: (data, varialbes) => {
      const responseData = data.data as APIResponse;
      if (responseData.code === EMAIL_LOGIN) {
        queryClient.setQueryData(emailKeys.all, varialbes);
        setLoginMode(STEP_PASSWORD);
      }
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as APIResponse;
      switch (errorResponse.code) {
        case EMAIL_CHECKED:
          alert("인증 완료된 이메일");
          queryClient.setQueryData(emailKeys.code(), errorResponse.code);
          router.push("/auth/signup");
          break;
        case EMAIL_NEW:
          alert("새로운 유저");
          queryClient.setQueryData(emailKeys.code(), errorResponse.code);
          setLoginMode(STEP_PIN);
          break;
        case EMAIL_BLOCKED:
          alert("비활성화 유저");
          queryClient.setQueryData(emailKeys.code(), errorResponse.code);
          setLoginMode(STEP_CHECK);
          break;
        default:
          alert("로그인에 실패했습니다.");
          break;
      }
    },
  });

  function onSubmitEmail(values: z.infer<typeof emailFormSchema>) {
    checkEmail.mutate(values);
  }

  function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    router.push("/");
  }

  function onSubmitPin(values: z.infer<typeof pinFormSchema>) {
    console.log(values);
    router.push("/auth/signup");
  }

  useEffect(() => {
    if (loginMode === STEP_PIN) {
      const id = setInterval(() => {
        setPinCount((count) => count - 1);
      }, 1000);
      if (pinCount <= 0) {
        clearInterval(id);
      }
      return () => clearInterval(id);
    }
  }, [loginMode, pinCount]);

  return (
    <>
      <Form {...formEmail}>
        <form
          onSubmit={formEmail.handleSubmit(onSubmitEmail)}
          className="space-y-6"
        >
          <FormField
            control={formEmail.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이메일 주소를 입력하세요"
                    onInput={() => {
                      setLoginMode(STEP_CHECK);
                      formLogin.resetField("password");
                      formPin.resetField("pin");
                    }}
                    {...field}
                  />
                </FormControl>
                {!formEmail.formState.errors.email &&
                  loginMode === STEP_CHECK && (
                    <FormDescription>
                      팀원과 쉽게 협업하려면 조직 이메일을 사용하세요.
                    </FormDescription>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />
          {loginMode === STEP_CHECK && (
            <Button type="submit" className="w-full">
              계속
            </Button>
          )}
        </form>
      </Form>
      {loginMode === STEP_PASSWORD && (
        <Form {...formLogin}>
          <form
            onSubmit={formLogin.handleSubmit(onSubmitLogin)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={formLogin.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="cursor-pointer">
                    비밀번호를 잊어버리셨나요?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              비밀번호로 계속하기
            </Button>
          </form>
        </Form>
      )}
      {loginMode === STEP_PIN && (
        <Form {...formPin}>
          <form
            onSubmit={formPin.handleSubmit(onSubmitPin)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={formPin.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인증번호</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup className="uppercase">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <div className="flex gap-1">
                    <FormDescription>
                      수신함으로 인증번호를 보내드렸습니다.
                    </FormDescription>
                    {pinCount > 0 ? (
                      <div className="text-sm text-gray-500">{` ${pinCount}초 후에 다시 보내기.`}</div>
                    ) : (
                      <div
                        className="text-sm text-blue-600 cursor-pointer"
                        onClick={() => {
                          setPinCount(30);
                          formPin.resetField("pin");
                        }}
                      >
                        다시 보내기
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              인증번호로 계속하기
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
