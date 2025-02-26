import { SENDPIN_SUCCESS } from "@/src/constant/apiResponseCode";
import useOptimisticMutation, {
  APIResponse,
} from "@/src/hooks/useOptimisticMutation";
import axiosInstance from "@/src/lib/apiAxiosInterceptors";
import { AxiosResponse } from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { LOGIN_STEP_PIN } from "./formSetLogin";
import {
  emailFormSchema,
  LoginFormSet,
  pinFormSchema,
} from "./loginFormSchema";

type Props = {
  formSet: LoginFormSet;
  step: number;
};

const FormPin = ({ step, formSet }: Props) => {
  const [pinCount, setPinCount] = useState<number>(30);

  const router = useRouter();

  // 인증 번호 이메일 전송 요청
  async function askPin(body: z.infer<typeof emailFormSchema>) {
    const response = await axiosInstance.post("/api/mail/auth-code", body);
    return response.data;
  }

  const handleSendPinSuccess = useCallback(
    (data: AxiosResponse<any, any>) => {
      const responseData = data as APIResponse;
      const code = responseData.code;
      switch (code) {
        case SENDPIN_SUCCESS:
          alert("인증번호를 전송했습니다. 이메일을 확인해주세요.");
          setPinCount(30);
          formSet.pin.resetField("pin");
          break;
        default:
          break;
      }
      return code;
    },
    [formSet.pin]
  );

  const key = [];
  const {
    mutate: askPinMutate,
    isPending,
    isSuccess,
  } = useOptimisticMutation(askPin, key);

  const askPinWithCallback = useCallback(() => {
    askPinMutate(formSet.email.getValues(), {
      onSuccess: (res) => handleSendPinSuccess(res),
    });
  }, [askPinMutate, formSet.email, handleSendPinSuccess]);

  function onSubmitPin(values: z.infer<typeof pinFormSchema>) {
    console.log(values);
    router.push("/auth/signup");
  }

  // 핀 재전송 카운트 다운
  useEffect(() => {
    if (step === LOGIN_STEP_PIN) {
      if (isSuccess && !isPending) {
        const id = setInterval(() => {
          setPinCount((count) => count - 1);
        }, 1000);
        if (pinCount <= 0) {
          clearInterval(id);
        }
        return () => clearInterval(id);
      } else if (!isSuccess && !isPending) {
        askPinWithCallback();
      }
    }
  }, [askPinWithCallback, isPending, isSuccess, pinCount, step]);

  if (step === LOGIN_STEP_PIN)
    return (
      <Form {...formSet.pin}>
        <form
          onSubmit={formSet.pin.handleSubmit(onSubmitPin)}
          className="space-y-6 mt-4"
        >
          <FormField
            control={formSet.pin.control}
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
                  {isPending ? (
                    <div className="flex gap-1 items-center text-sm text-gray-500">
                      전송중
                      <Loader2 className="size-4 animate-spin" />
                    </div>
                  ) : pinCount > 0 ? (
                    <div className="text-sm text-gray-500">{` ${pinCount}초 후에 다시 보내기.`}</div>
                  ) : (
                    <div
                      className="text-sm text-blue-600 cursor-pointer"
                      onClick={() => {
                        askPinMutate(formSet.email.getValues(), {
                          onSuccess: (res) => handleSendPinSuccess(res),
                        });
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
    );
};

export default FormPin;
