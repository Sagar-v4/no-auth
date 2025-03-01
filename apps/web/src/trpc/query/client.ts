import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/server";

export function getClientById(id: string) {
  const { clients } = useTRPC();

  const queryOptions = clients.findById.queryOptions(
    {
      filter: {
        _id: id,
      },
    },
    {
      staleTime: 60 * 1000, // 1 min
      refetchInterval: 60 * 1000, // 1 min
      select: (data) => {
        const { _id, ...rest } = data;
        return {
          ...rest,
          id: _id,
        };
      },
      trpc: {
        abortOnUnmount: true,
        ssr: true,
      },
    },
  );

  return useQuery(queryOptions);
}
