import { LoginType } from "@/schemas/login-schema";
import axiosInstance from "./axios";
import { SignupType } from "@/schemas/sign-up-schema";

const postLogin = async ({ email, password }: LoginType) => {
  const { data } = await axiosInstance.post("auth/signin", {
    email,
    password,
  });
  return data;
};

const postSignup = async ({
  email,
  password,
  name,
  passwordConfirm,
}: SignupType) => {
  const { data } = await axiosInstance.post("auth/signup", {
    email,
    password,
    name,
    passwordConfirm,
  });

  return data;
};

export { postLogin, postSignup };
