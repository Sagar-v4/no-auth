"use client";

import {
  isServer,
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { env } from "@/env/client/env.schema";
import { TRPCProvider } from "@/trpc/server";
import type { AppRouter } from "@/lib/trpc/@generated/server";

function getBaseUrl() {
  if (typeof window !== "undefined") return env.APP_BASE_URL;
  // browser should use relative path
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return env.APP_BASE_URL;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000, // 1 min
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        networkMode: "always",
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();

export function TrpcReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [trpcClient] = useState(() =>
  //   createTRPCClient<AppRouter>({
  //     links: [
  //       httpBatchLink({
  //         url: `${env.APP_BASE_URL}/trpc`,
  //       }),
  //     ],
  //   })
  // );

  const queryClient = getQueryClient();
  const trpcClient = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${env.APP_BASE_URL}/trpc`,
      }),
    ],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TRPCProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
