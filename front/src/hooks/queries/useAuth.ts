import { postLogin, postSignup } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken }) => {
      window.location.href = "/dashboard";
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  return { loginMutation, signupMutation };
}

export default useAuth;
