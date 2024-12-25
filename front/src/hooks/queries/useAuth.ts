import { postLogin, postSignup } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}

export type CustomError = AxiosError<ErrorResponse>;

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken }) => {
      window.location.href = "/dashboard";
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  return { loginMutation, signupMutation };
}

export default useAuth;
