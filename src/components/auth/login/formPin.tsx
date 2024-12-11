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
import { STEP_PIN } from "./formSetLogin";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { LoginFormSet, pinFormSchema } from "./loginFormSchema";
import { z } from "zod";
import { useEffect, useState } from "react";

type Props = {
  formSet: LoginFormSet;
  step: number;
};

const FormPin = ({ step, formSet }: Props) => {
  const [pinCount, setPinCount] = useState<number>(30);

  const router = useRouter();

  function onSubmitPin(values: z.infer<typeof pinFormSchema>) {
    console.log(values);
    router.push("/auth/signup");
  }

  // 핀 재전송 카운트 다운
  useEffect(() => {
    if (step === STEP_PIN) {
      const id = setInterval(() => {
        setPinCount((count) => count - 1);
      }, 1000);
      if (pinCount <= 0) {
        clearInterval(id);
      }
      return () => clearInterval(id);
    }
  }, [step, pinCount]);

  if (step === STEP_PIN)
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
                  {pinCount > 0 ? (
                    <div className="text-sm text-gray-500">{` ${pinCount}초 후에 다시 보내기.`}</div>
                  ) : (
                    <div
                      className="text-sm text-blue-600 cursor-pointer"
                      onClick={() => {
                        setPinCount(30);
                        formSet.pin.resetField("pin");
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
