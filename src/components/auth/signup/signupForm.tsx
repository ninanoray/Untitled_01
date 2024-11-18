import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

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
          <FormField
            control={formSignup.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem className="mt-10 mb-8 flex-center flex-col">
                <FormLabel className="flex-center flex-col gap-4 cursor-pointer">
                  <Avatar className="size-32">
                    <AvatarImage src={preview} />
                    <AvatarFallback>기본</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-400 text-xl">사진 추가</p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files[0]);
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
