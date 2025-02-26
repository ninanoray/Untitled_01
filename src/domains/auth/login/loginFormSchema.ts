import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type LoginFormSet = {
  email: UseFormReturn<z.infer<typeof emailFormSchema>>;
  signin: UseFormReturn<z.infer<typeof signinFormSchema>>;
  pin: UseFormReturn<z.infer<typeof pinFormSchema>>;
};

export const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email("유효하지 않은 이메일입니다."),
});

export const signinFormSchema = z.object({
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const pinFormSchema = z.object({
  pin: z.string().min(6, { message: "인증코드 6자리를 입력해주세요." }),
});
