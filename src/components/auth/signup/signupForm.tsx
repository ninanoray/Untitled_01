import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import InputImage from "./inputImage";
import { signupFormSchema } from "./signupFormSchema";

const SignupForm = () => {
  const [preview, setPreview] = useState("");

  const router = useRouter();

  const formSignup = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    router.push("/");
  }

  return (
    <>
      <Form {...formSignup}>
        <form
          onSubmit={formSignup.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <InputImage
            control={formSignup.control}
            preview={preview}
            setPreview={setPreview}
          />
          <FormField
            control={formSignup.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>선호하는 이름</FormLabel>
                <FormControl>
                  <Input placeholder="니나노래, Ninanoray" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formSignup.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 설정</FormLabel>
                <FormControl>
                  <Input placeholder="비밀번호" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-12">
            계속
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
