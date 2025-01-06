import { LoginType } from "@/schemas/sign-in-schema";
import { SignupType } from "@/schemas/sign-up-schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const postLogin = async ({ email, password }: LoginType) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  console.log("데이타", data);

  if (!data.success) {
    throw {
      message: data.message,
      result: data.result,
      success: data.success,
    };
  }

  return data;
};

const postSignup = async ({
  email,
  password,
  name,
  passwordConfirm,
}: SignupType) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      name,
      passwordConfirm,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw {
      message: data.message,
      error: data.error,
      statusCode: response.status,
    };
  }

  return data;
};

export { postLogin, postSignup };
