import { createInit, GET } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import {
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

interface AuthStatus {
  isLoggedIn: boolean;
  user: {
    id: number;
    name: string;
    imageUri: string | null;
    role: string;
  } | null;
}

const getAuthStatus = async () => {
  const data = await GET<AuthStatus | undefined>(
    END_POINTS.AUTH_STATUS,
    createInit(),
  );

  console.log("query: ", data);

  return data;
};

export const getAuthStatusQueryOptions = (): UseSuspenseQueryOptions<
  AuthStatus | undefined
> => ({
  queryKey: [queryKeys.AUTH_STATUS],
  queryFn: getAuthStatus,
  staleTime: 1000 * 60 * 5, // 5분
});

export const useAuthStatusQuery = () => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(getAuthStatusQueryOptions());

  const updateAuthStatus = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.AUTH_STATUS],
    });
  };

  return {
    authStatus: data,
    updateAuthStatus,
  };
};
