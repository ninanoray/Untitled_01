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
import {
  EMAIL_LOGIN,
  EMAIL_CHECKED,
  EMAIL_NEW,
  EMAIL_BLOCKED,
} from "@/src/constant/apiResponseCode";
import useOptimisticMutation, {
  APIResponse,
  queryKeys,
} from "@/src/hooks/useOptimisticMutation";
import axiosInstance from "@/src/lib/apiAxiosInterceptors";
import { AxiosResponse, AxiosError } from "axios";
import { z } from "zod";
import { emailFormSchema, LoginFormSet } from "./loginFormSchema";
import {
  LOGIN_STEP_PASSWORD,
  LOGIN_STEP_PIN,
  LOGIN_STEP_INIT,
} from "./formSetLogin";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type Props = {
  formSet: LoginFormSet;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

const FormEmail = ({ formSet, step, setStep }: Props) => {
  const router = useRouter();

  // 이메일 체크 요청
  const checkEmail = async (body: z.infer<typeof emailFormSchema>) => {
    const response = await axiosInstance.post("/api/auth/validate-email", body);
    return response.data;
  };

  const handleEmailSuccess = (data: AxiosResponse<any, any>) => {
    const responseData = data as APIResponse;
    const code = responseData.code;
    switch (code) {
      case EMAIL_LOGIN:
        setStep(LOGIN_STEP_PASSWORD);
        break;
      default:
        break;
    }
  };

  const handleEmailError = (error: AxiosError) => {
    const errorResponse = error.response?.data as APIResponse;
    const code = errorResponse.code;
    switch (code) {
      case EMAIL_CHECKED:
        alert("인증 완료된 이메일");
        router.push("/auth/signup");
        break;
      case EMAIL_NEW:
        setStep(LOGIN_STEP_PIN);
        break;
      case EMAIL_BLOCKED:
        alert("비활성화 유저");
        setStep(LOGIN_STEP_INIT);
        break;
      default:
        break;
    }
  };

  const key = queryKeys.emailController.email();
  const { mutate: checkEmailMutate } = useOptimisticMutation(
    checkEmail,
    queryKeys.emailController.email()
  );

  return (
    <Form {...formSet.email}>
      <form
        onSubmit={formSet.email.handleSubmit((values) =>
          checkEmailMutate(values, {
            onSuccess: (res) => handleEmailSuccess(res),
            onError: (res) => handleEmailError(res),
          })
        )}
        className="space-y-6"
      >
        <FormField
          control={formSet.email.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일 주소를 입력하세요"
                  onInput={() => {
                    setStep(LOGIN_STEP_INIT);
                    formSet.signin.resetField("password");
                    formSet.pin.resetField("pin");
                  }}
                  {...field}
                />
              </FormControl>
              {!formSet.email.formState.errors.email &&
                step === LOGIN_STEP_INIT && (
                  <FormDescription>
                    팀원과 쉽게 협업하려면 조직 이메일을 사용하세요.
                  </FormDescription>
                )}
              <FormMessage />
            </FormItem>
          )}
        />
        {step === LOGIN_STEP_INIT && (
          <Button type="submit" className="w-full">
            계속
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FormEmail;
