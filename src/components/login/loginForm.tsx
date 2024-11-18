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
} from "../ui/form";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  emailFormSchema,
  loginFormSchema,
  pinFormSchema,
} from "./loginFormSchema";

const CHECK_EMAIL = 0;
const CHECK_PASSWORD = 1;
const CHECK_PIN = 2;

const LoginForm = () => {
  const [loginMode, setLoginMode] = useState<number>(CHECK_EMAIL);
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

  function onSubmitEmail(values: z.infer<typeof emailFormSchema>) {
    console.log(values);
    if (values.email.includes("test")) setLoginMode(CHECK_PASSWORD);
    else setLoginMode(CHECK_PIN);
  }

  function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    router.push("/");
  }

  function onSubmitPin(values: z.infer<typeof pinFormSchema>) {
    console.log(values);
    router.push("/");
  }

  useEffect(() => {
    if (loginMode === CHECK_PIN) {
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
                      setLoginMode(CHECK_EMAIL);
                      formLogin.resetField("password");
                      formPin.resetField("pin");
                    }}
                    {...field}
                  />
                </FormControl>
                {!formEmail.formState.errors.email &&
                  loginMode === CHECK_EMAIL && (
                    <FormDescription>
                      팀원과 쉽게 협업하려면 조직 이메일을 사용하세요.
                    </FormDescription>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />
          {loginMode === CHECK_EMAIL && (
            <Button type="submit" className="w-full">
              계속
            </Button>
          )}
        </form>
      </Form>
      {loginMode === CHECK_PASSWORD && (
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
                    <Input placeholder="비밀번호를 입력하세요" {...field} />
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
      {loginMode === CHECK_PIN && (
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
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="flex gap-2">
                    수신함으로 인증번호를 보내드렸습니다.
                    {pinCount > 0 ? (
                      <p className="text-sm text-gray-500">{`${pinCount}초 후에 다시 보내기.`}</p>
                    ) : (
                      <p
                        className="text-sm text-blue-600 cursor-pointer"
                        onClick={() => setPinCount(30)}
                      >
                        다시 보내기
                      </p>
                    )}
                  </FormDescription>
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
