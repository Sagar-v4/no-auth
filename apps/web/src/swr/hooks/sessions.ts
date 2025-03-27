"use client";

import useSWRMutation from "swr/mutation";

import {
  RefreshTokenCreate,
  SignedRefreshToken,
} from "@/lib/trpc/schemas/v1/sessions";
import { fetcher } from "@/swr/server";
import { env } from "@/env/client/env.schema";

export function useLoginMutation() {
  return useSWRMutation<SignedRefreshToken, Error, string, RefreshTokenCreate>(
    `${env.APP_BASE_URL}/api/v1/sessions/sign/refresh`,
    (url: RequestInfo, { arg }: { arg: RefreshTokenCreate }) => {
      return fetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
  );
}
