import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/server";

export function getEmailAppsByData() {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByData.queryOptions(
    {
      filter: [
        {
          organization_id: "67c3351735d35d798b8aa54b",
        },
      ],
    },
    {
      staleTime: 60 * 1000, // 1 min
      refetchInterval: 60 * 1000, // 1 min
      // select: (data) => {
      //   const { _id, ...rest } = data;
      //   return {
      //     ...rest,
      //     id: _id,
      //   };
      // },
      trpc: {
        abortOnUnmount: true,
        ssr: true,
      },
    },
  );

  return useQuery(queryOptions);
}
export function getEmailAppsByRef() {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByRef.queryOptions(
    {
      filter: {
        client: {},
        email_app: {},
        organization: {},
      },
    },
    {
      staleTime: 60 * 1000, // 1 min
      refetchInterval: 60 * 1000, // 1 min
      // select: (data) => {
      //   const { _id, ...rest } = data;
      //   return {
      //     ...rest,
      //     id: _id,
      //   };
      // },
      trpc: {
        abortOnUnmount: true,
        ssr: true,
      },
    },
  );

  return useQuery(queryOptions);
}
