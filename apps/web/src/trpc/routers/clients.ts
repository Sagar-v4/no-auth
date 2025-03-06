import { toast } from "sonner";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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
import { queryClient } from "@/trpc/provider";

export function createOneClient() {
  const { clients } = useTRPC();

  const mutationOptions = clients.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clients.findByData.queryKey();
      const findById = clients.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneClientInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating client...",
      success: "Client created successfully",
      error: "Failed to create client",
    });
  };

  return { exec, ...mutation };
}

export function createManyClient() {
  const { clients } = useTRPC();

  const mutationOptions = clients.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clients.findByData.queryKey();
      const findById = clients.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyClientInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating client...",
      success: "Client created successfully",
      error: "Failed to create client",
    });
  };

  return { exec, ...mutation };
}

export function getClientById(input: FindByClientIdInputType) {
  const { clients } = useTRPC();

  const queryOptions = clients.findById.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    trpc: {
      abortOnUnmount: true,
      ssr: true,
    },
  });

  const query = useSuspenseQuery(queryOptions);

  const exec = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });

    toast.promise(promise, {
      richColors: true,
      loading: "Fetching client...",
      error: "Failed to fetch client",
    });
  };

  return { exec, ...query };
}

export function getClientsByData(input: FindByClientDataInputType) {
  const { clients } = useTRPC();

  const queryOptions = clients.findByData.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    trpc: {
      abortOnUnmount: true,
      ssr: true,
    },
  });

  const query = useQuery(queryOptions);

  const exec = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });

    toast.promise(promise, {
      richColors: true,
      loading: "Fetching client...",
      error: "Failed to fetch client",
    });
  };

  return { exec, ...query };
}

export function updateClientById() {
  const { clients } = useTRPC();

  const mutationOptions = clients.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clients.findByData.queryKey();
      const findById = clients.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByClientIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating client...",
      success: "Client updated successfully",
      error: "Failed to update client",
    });
  };

  return { exec, ...mutation };
}

export function updateClientsByData() {
  const { clients } = useTRPC();

  const mutationOptions = clients.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clients.findByData.queryKey();
      const findById = clients.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByClientDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating client...",
      success: "Client updated successfully",
      error: "Failed to update client",
    });
  };

  return { exec, ...mutation };
}

export function deleteClientsByData() {
  const { clients } = useTRPC();

  const mutationOptions = clients.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clients.findByData.queryKey();
      const findById = clients.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByClientDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting client...",
      success: "Client deleted successfully",
      error: "Failed to delete client",
    });
  };

  return { exec, ...mutation };
}
