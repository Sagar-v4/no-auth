import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneClienteleInputType,
  InsertManyClienteleInputType,
  FindByClienteleIdInputType,
  FindByClienteleDataInputType,
  FindByClienteleRefInputType,
  UpdateByClienteleIdInputType,
  UpdateByClienteleDataInputType,
  DeleteByClienteleDataInputType,
  DeleteByClienteleRefInputType,
} from "@/lib/trpc/schemas/clienteles";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneClientele() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneClienteleInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating clientele...",
      success: "Clientele created successfully",
      error: "Failed to create clientele",
    });
  };

  return { exec, ...mutation };
}

export function createManyClientele() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyClienteleInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating clientele...",
      success: "Clientele created successfully",
      error: "Failed to create clientele",
    });
  };

  return { exec, ...mutation };
}

export function getClienteleById(input: FindByClienteleIdInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findById.queryOptions(input, {
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
      loading: "Fetching clientele...",
      error: "Failed to fetch clientele",
    });
  };

  return { exec, ...query };
}

export function getClientelesByData(input: FindByClienteleDataInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findByData.queryOptions(input, {
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
      loading: "Fetching clientele...",
      error: "Failed to fetch clientele",
    });
  };

  return { exec, ...query };
}

export function getClientelesByRef(input: FindByClienteleRefInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findByRef.queryOptions(input, {
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
      loading: "Fetching clientele...",
      error: "Failed to fetch clientele",
    });
  };

  return { exec, ...query };
}

export function updateClienteleById() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByClienteleIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating clientele...",
      success: "Clientele updated successfully",
      error: "Failed to update clientele",
    });
  };

  return { exec, ...mutation };
}

export function updateClientelesByData() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByClienteleDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating clientele...",
      success: "Clientele updated successfully",
      error: "Failed to update clientele",
    });
  };

  return { exec, ...mutation };
}

export function deleteClientelesByData() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByClienteleDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting clientele...",
      success: "Clientele deleted successfully",
      error: "Failed to delete clientele",
    });
  };

  return { exec, ...mutation };
}

export function deleteClientelesByRef() {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = clienteles.findByData.queryKey();
      const findById = clienteles.findById.queryKey();
      const findByRef = clienteles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByClienteleRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting clientele...",
      success: "Clientele deleted successfully",
      error: "Failed to delete clientele",
    });
  };

  return { exec, ...mutation };
}
