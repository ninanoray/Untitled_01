import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email("유효하지 않은 이메일입니다."),
  //   .refine(async (e) => {
  //     const emails = await fetchEmails();
  //     return emails.includes(e);
  //   }, "This email is not in our database"),
});
