import { postLogin, postSignup } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface ServerResponse<T> {
  message: string;
  result: T | null;
  success: boolean;
}

export interface SuccessResponse<T> extends ServerResponse<T> {
  success: true;
  result: T;
}

export interface ErrorResponse extends ServerResponse<null> {
  success: false;
  result: null;
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken }) => {
      window.location.href = "/";
    },
    onError: (error: ServerResponse<null>) => {
      toast.error(error.message);
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: ({ message }) => {
      // window.location.href = "/login";
      toast.success(message);
    },
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
