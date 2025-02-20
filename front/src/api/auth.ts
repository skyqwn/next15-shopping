import { SigninType } from "@/schemas/sign-in.schema";
import { SignupType } from "@/schemas/sign-up.schema";
import { createInit, POST } from "./httpMethod";

interface LoginResponse {
  success: boolean;
  message: string;
  result: {
    accessToken: string;
  };
}

interface SignupResponse {
  success: boolean;
  message: string;
}

const postLogin = async ({ email, password }: SigninType) => {
  return await POST<LoginResponse>(
    "/auth/signin",
    createInit({
      email,
      password,
    }),
  );
};

const postSignup = async ({
  email,
  password,
  name,
  passwordConfirm,
}: SignupType) => {
  return await POST<SignupResponse>(
    "/auth/signup",
    createInit({
      email,
      password,
      name,
      passwordConfirm,
    }),
  );
};
const postLogout = async () => {
  return await POST<{ success: boolean }>(`/auth/signout`, createInit());
};

export { postLogin, postSignup, postLogout };
