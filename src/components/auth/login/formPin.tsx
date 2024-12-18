import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { LOGIN_STEP_PIN } from "./formSetLogin";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import {
  emailFormSchema,
  LoginFormSet,
  pinFormSchema,
} from "./loginFormSchema";
import { z } from "zod";
import { useEffect, useState } from "react";
import useOptimisticMutation, {
  APIResponse,
} from "@/src/hooks/useOptimisticMutation";
import axiosInstance from "@/src/lib/apiAxiosInterceptors";
import { SENDPIN_SUCCESS } from "@/src/constant/apiResponseCode";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";

type Props = {
  formSet: LoginFormSet;
  step: number;
};

const FormPin = ({ step, formSet }: Props) => {
  const [pinCount, setPinCount] = useState<number>(30);
  const [pin, setPin] = useState<string>();

  const router = useRouter();

  // 인증 번호 이메일 전송 요청
  async function askPin(body: z.infer<typeof emailFormSchema>) {
    const response = await axiosInstance.post("/api/mail/auth-code", body);
    return response.data;
  }
  const handleSendPinSuccess = (data: AxiosResponse<any, any>) => {
    const responseData = data as APIResponse;
    const code = responseData.code;
    switch (code) {
      case SENDPIN_SUCCESS:
        alert("인증번호를 전송했습니다. 이메일을 확인해주세요.");
        setPin(responseData.data);
        setPinCount(30);
        formSet.pin.resetField("pin");
        break;
      default:
        break;
    }
  };

  function onSubmitPin(values: z.infer<typeof pinFormSchema>) {
    console.log(values);
    if (pin && values.pin === pin) router.push("/auth/signup");
    else alert("인증번호가 올바르지 않습니다.");
  }

  const {
    mutate: askPinMutate,
    isPending,
    isSuccess,
  } = useOptimisticMutation(askPin, []);

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
        askPinMutate(formSet.email.getValues(), {
          onSuccess: (res) => handleSendPinSuccess(res),
        });
      }
    }
  }, [step, pinCount, isSuccess, askPinMutate, formSet.email, isPending]);

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
