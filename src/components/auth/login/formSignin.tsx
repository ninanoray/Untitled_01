import { SIGNIN_SUCCESS, SIGNIN_FAILED } from "@/src/constant/apiResponseCode";
import useOptimisticMutation, {
  APIResponse,
  queryKeys,
} from "@/src/hooks/useOptimisticMutation";
import axiosInstance from "@/src/lib/apiAxiosInterceptors";
import { AxiosResponse, AxiosError } from "axios";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { LOGIN_STEP_PASSWORD } from "./formSetLogin";
import { LoginFormSet, signinFormSchema } from "./loginFormSchema";
import { useRouter } from "next/navigation";
import { User } from "@/src/types/type";

type Props = {
  formSet: LoginFormSet;
  step: number;
};

const FormSignin = ({ step, formSet }: Props) => {
  const router = useRouter();

  // 로그인(비밀번호 입력) 요청
  const signin = async (body: z.infer<typeof signinFormSchema>) => {
    const response = await axiosInstance.post("/api/auth/login", body);
    return response.data;
  };

  const handleLoginSuccess = (data: AxiosResponse<any, any>) => {
    const responseData = data as APIResponse;
    const code = responseData.code;
    switch (code) {
      case SIGNIN_SUCCESS:
        const userData = responseData.data as User;
        console.log("User: ", userData);
        router.push("/");
        break;
      default:
        break;
    }
  };

  const handleLoginError = (error: AxiosError) => {
    const errorResponse = error.response?.data as APIResponse;
    const code = errorResponse.code;
    switch (code) {
      case SIGNIN_FAILED:
        alert("로그인에 실패했습니다.");
        break;
      default:
        break;
    }
  };

  const { mutate: signinMutate } = useOptimisticMutation(
    signin,
    queryKeys.signinController.signin()
  );

  if (step === LOGIN_STEP_PASSWORD)
    return (
      <Form {...formSet.signin}>
        <form
          onSubmit={formSet.signin.handleSubmit((value) => {
            const emailValue = formSet.email.getValues("email");
            signinMutate(
              { ...value, email: emailValue },
              {
                onSuccess: (res) => handleLoginSuccess(res),
                onError: (res) => handleLoginError(res),
              }
            );
          })}
          className="space-y-6 mt-4"
        >
          <FormField
            control={formSet.signin.control}
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
    );
};

export default FormSignin;
