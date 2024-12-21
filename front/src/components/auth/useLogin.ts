import { LoginType } from "@/schemas/login-schema";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("An error occurred while trying to login");
      }
      return response.json();
    },
  });
};

export default useLogin;
