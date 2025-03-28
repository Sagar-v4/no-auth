"use client";

import * as SWR from "swr";

import { fetcher } from "./fetcher";
import { UseUser } from "../../../libs/trpc/schemas/v1/users";
import { server_url, sso_url } from "./urls";

const { default: useSWR } = SWR;

export function useUser() {
  const {
    data: user,
    error,
    isLoading: isUserLoading,
  } = useSWR<UseUser>(
    `${server_url}api/v1/sessions/users`,
    (url) =>
      fetcher(url, {
        method: "GET",
      }),
    {
      revalidateIfStale: false,
    },
  );

  if (error) {
    window.location.href = sso_url.toString();
  }

  return {
    user,
    isUserLoading,
  };
}
