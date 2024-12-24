"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getQueryClient } from "./lib/tanstack-query/client";
import { Toaster } from "sonner";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <NuqsAdapter> */}
      {children} <Toaster richColors />
      {/* </NuqsAdapter> */}
    </QueryClientProvider>
  );
}
