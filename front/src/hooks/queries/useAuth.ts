import { postLogin, postLogout, postSignup } from "@/api/auth";
import { queryKeys } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => {
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
    onSuccess: ({}) => {
      toast.success("회원가입이 완료되었습니다");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}
function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.USER_INFO],
      // });
      queryClient.setQueryData([queryKeys.USER_INFO], {
        isLoggedIn: false,
        data: null,
        message: "Logged out",
      });
      toast.success("로그아웃되었습니다");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("로그아웃 실패");
    },
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  return { loginMutation, signupMutation, logoutMutation };
}

export default useAuth;
