import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { emailFormSchema, loginFormSchema } from "./loginFormSchema";

const CHECK_EMAIL = 0;
const CHECK_PASSWORD = 1;
const CHECK_PIN = 2;

const LoginForm = () => {
  const [loginMode, setLoginMode] = useState<number>(CHECK_EMAIL);

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

  function onSubmitEmail(values: z.infer<typeof emailFormSchema>) {
    console.log(values);
    if (values.email.includes("test")) setLoginMode(CHECK_PASSWORD);
    else setLoginMode(CHECK_PIN);
  }

  function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    router.push("/");
  }

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
                  <FormDescription>비밀번호를 잊어버리셨나요?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              비밀번호로 계속
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
