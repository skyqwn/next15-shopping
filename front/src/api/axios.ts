import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if (originalRequest.url === "/auth/signin") {
    //   return Promise.reject(error);
    // }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const userId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("userId="))
          ?.split("=")[1];

        if (!userId) {
          throw new Error("No user ID found");
        }

        await axiosInstance.post("/auth/refreshToken", {
          userId,
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 만료. 로그인 필요");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
