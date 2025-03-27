"use client";

import useSWRMutation from "swr/mutation";

import { fetcher } from "@/swr/server";
import { env } from "@/env/client/env.schema";
import {
  SecretSendInput,
  SecretSendOutput,
  SecretVerifyInput,
  SecretVerifyOutput,
} from "@/lib/trpc/schemas/v1/sso";

export function useSSOSecretSendMutation() {
  return useSWRMutation<SecretSendOutput, Error, string, SecretSendInput>(
    `${env.APP_BASE_URL}/api/v1/sso/secret/send`,
    (url: RequestInfo, { arg }: { arg: SecretSendInput }) => {
      return fetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    {},
  );
}

export function useSSOSecretVerifyMutation() {
  return useSWRMutation<SecretVerifyOutput, Error, string, SecretVerifyInput>(
    `${env.APP_BASE_URL}/api/v1/sso/secret/verify`,
    (url: RequestInfo, { arg }: { arg: SecretVerifyInput }) => {
      return fetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    {},
  );
}
