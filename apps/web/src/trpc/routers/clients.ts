import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneClientInputType,
  InsertManyClientInputType,
  FindByClientIdInputType,
  FindByClientDataInputType,
  UpdateByClientIdInputType,
  UpdateByClientDataInputType,
  DeleteByClientDataInputType,
} from "@/lib/trpc/schemas/clients";
import { useTRPC } from "@/trpc/server";

/**
onMutate(variables) {
      toast.info("Client onMutate()", {
        richColors: true,
        position: "bottom-right",
        icon: Loading(),
      });
    },
    onSuccess(data, variables, context) {
      toast.success("Client created." + data._id, {
        richColors: true,
        position: "bottom-right",
      });
    },
    onError(error, variables, context) {
      toast.error("Failed to create client." + error.message, {
        richColors: true,
        position: "bottom-right",
      });
    },
    onSettled(data, error, variables, context) {
      toast.warning("Client onSettled()", {
        richColors: true,
        position: "bottom-right",
      });
    },
 */
export function createOneClient(input: InsertOneClientInputType) {
  const { clients } = useTRPC();

  const mutationOptions = clients.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const createOneClient = async () => {
    const promise = mutation.mutateAsync(input, {
      onSuccess(data, variables, context) {
        toast.success("Client created." + data._id, {
          richColors: true,
          position: "bottom-right",
        });
      },
      onError(error, variables, context) {
        toast.error("Failed to create client." + error.message, {
          richColors: true,
          position: "bottom-right",
        });
      },
      onSettled(data, error, variables, context) {
        toast.warning("Client onSettled()", {
          richColors: true,
          position: "bottom-right",
        });
      },
    });

    toast.promise(promise, {
      richColors: true,
      position: "top-right",
      success: (data) => {
        return `${data.email} added`;
      },
      error: (data) => {
        return {
          message: `Failed to add ${data.message} toast`,
        };
      },
      finally() {
        // toast.message("done");
      },

      loading: "Creating client...",
      // description: "Creating client...",
    });
  };

  return { createOneClient, ...mutation };
}

export function createManyClient(input: InsertManyClientInputType) {
  const { clients } = useTRPC();

  const mutationOptions = clients.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const createManyClient = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { createManyClient, ...mutation };
}

export function getClientById(input: FindByClientIdInputType) {
  const { clients } = useTRPC();

  const queryOptions = clients.findById.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
    select: (data) => {
      if (!data) return null;

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
    enabled: true,
  });

  const query = useQuery(queryOptions);

  const getClientById = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });
  };

  return { getClientById, ...query };
}

export function getClientsByData(input: FindByClientDataInputType) {
  const { clients } = useTRPC();

  const queryOptions = clients.findByData.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
    // select: (data) => {
    //   if (!data) return null;

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
    enabled: true,
  });

  const query = useQuery(queryOptions);

  const getClientsByData = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });
  };

  return { getClientsByData, ...query };
}

export function updateClientById(input: UpdateByClientIdInputType) {
  const { clients } = useTRPC();

  const mutationOptions = clients.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const updateClientById = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { updateClientById, ...mutation };
}

export function updateClientsByData(input: UpdateByClientDataInputType) {
  const { clients } = useTRPC();

  const mutationOptions = clients.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const updateClientsByData = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { updateClientsByData, ...mutation };
}

export function deleteClientsByData(input: DeleteByClientDataInputType) {
  const { clients } = useTRPC();

  const mutationOptions = clients.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const deleteClientsByData = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { deleteClientsByData, ...mutation };
}
