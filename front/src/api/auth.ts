import { LoginType } from "@/schemas/login-schema";
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

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
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

  if (!response.ok) {
    const error = await response.json();
    console.log("에러에러", error);
    throw error;
  }

  return response.json();
};

export { postLogin, postSignup };

// const postLogin = async ({ email, password }: LoginType) => {
//   const { data } = await axiosInstance.post("auth/signin", {
//     email,
//     password,
//   });
//   return data;
// };

// const postSignup = async ({
//   email,
//   password,
//   name,
//   passwordConfirm,
// }: SignupType) => {
//   const { data } = await axiosInstance.post("auth/signup", {
//     email,
//     password,
//     name,
//     passwordConfirm,
//   });

//   return data;
// };

// export { postLogin, postSignup };
