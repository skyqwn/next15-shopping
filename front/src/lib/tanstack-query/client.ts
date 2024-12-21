import {
  QueryClient,
  isServer,
  QueryCache,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

export const defaultStaleTime = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultStaleTime,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) &&
          query.state.status === "pending",
      },
    },
    queryCache: new QueryCache({}),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
