import { z } from "zod";

const IMAGE_SIZE = 5;

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .max(10, { message: "최대 10글자로 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
  image: z
    .any()
    .refine(
      (file) => file?.size <= IMAGE_SIZE * 1000 * 1000,
      `이미지 최대 사이즈는 ${IMAGE_SIZE}MB 입니다.`
    )
    .refine((file) => file?.type.includes("image/")),
});
