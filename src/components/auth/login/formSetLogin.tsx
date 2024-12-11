import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  emailFormSchema,
  signinFormSchema,
  pinFormSchema,
} from "./loginFormSchema";
import FormEmail from "./formEmail";
import FormSignin from "./formSignin";
import FormPin from "./formPin";

export const STEP_INIT = 0;
export const STEP_PASSWORD = 1;
export const STEP_PIN = 2;

const FormSetLogin = () => {
  const [authStep, setAuthStep] = useState<number>(STEP_INIT);

  const loginFormSet = {
    email: useForm<z.infer<typeof emailFormSchema>>({
      resolver: zodResolver(emailFormSchema),
      defaultValues: {
        email: "",
      },
    }),
    signin: useForm<z.infer<typeof signinFormSchema>>({
      resolver: zodResolver(signinFormSchema),
      defaultValues: {
        password: "",
      },
    }),
    pin: useForm<z.infer<typeof pinFormSchema>>({
      resolver: zodResolver(pinFormSchema),
      defaultValues: {
        pin: "",
      },
    }),
  };

  return (
    <>
      <FormEmail formSet={loginFormSet} step={authStep} setStep={setAuthStep} />
      <FormSignin formSet={loginFormSet} step={authStep} />
      <FormPin formSet={loginFormSet} step={authStep} />
    </>
  );
};

export default FormSetLogin;
