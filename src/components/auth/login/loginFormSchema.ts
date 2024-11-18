import { z } from "zod";

export const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email("유효하지 않은 이메일입니다."),
  //   .refine(async (e) => {
  //     const emails = await fetchEmails();
  //     return emails.includes(e);
  //   }, "This email is not in our database"),
});

export const loginFormSchema = z.object({
  // email: z
  //   .string()
  //   .min(1, { message: "이메일을 입력해주세요." })
  //   .email("유효하지 않은 이메일입니다."),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const pinFormSchema = z.object({
  pin: z.string().min(6, { message: "인증코드 6자리를 입력해주세요." }),
});
