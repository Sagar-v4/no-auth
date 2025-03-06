import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneKeyInputType,
  InsertManyKeyInputType,
  FindByKeyIdInputType,
  FindByKeyDataInputType,
  FindByKeyRefInputType,
  UpdateByKeyIdInputType,
  UpdateByKeyDataInputType,
  DeleteByKeyDataInputType,
  DeleteByKeyRefInputType,
} from "@/lib/trpc/schemas/keys";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneKey() {
  const { keys } = useTRPC();

  const mutationOptions = keys.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneKeyInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating key...",
      success: "Key created successfully",
      error: "Failed to create key",
    });
  };

  return { exec, ...mutation };
}

export function createManyKey() {
  const { keys } = useTRPC();

  const mutationOptions = keys.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyKeyInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating key...",
      success: "Key created successfully",
      error: "Failed to create key",
    });
  };

  return { exec, ...mutation };
}

export function getKeyById(input: FindByKeyIdInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findById.queryOptions(input, {
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
      loading: "Fetching key...",
      error: "Failed to fetch key",
    });
  };

  return { exec, ...query };
}

export function getKeysByData(input: FindByKeyDataInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findByData.queryOptions(input, {
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
      loading: "Fetching key...",
      error: "Failed to fetch key",
    });
  };

  return { exec, ...query };
}

export function getKeysByRef(input: FindByKeyRefInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findByRef.queryOptions(input, {
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
      loading: "Fetching key...",
      error: "Failed to fetch key",
    });
  };

  return { exec, ...query };
}

export function updateKeyById() {
  const { keys } = useTRPC();

  const mutationOptions = keys.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByKeyIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating key...",
      success: "Key updated successfully",
      error: "Failed to update key",
    });
  };

  return { exec, ...mutation };
}

export function updateKeysByData() {
  const { keys } = useTRPC();

  const mutationOptions = keys.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByKeyDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating key...",
      success: "Key updated successfully",
      error: "Failed to update key",
    });
  };

  return { exec, ...mutation };
}

export function deleteKeysByData() {
  const { keys } = useTRPC();

  const mutationOptions = keys.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByKeyDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting key...",
      success: "Key deleted successfully",
      error: "Failed to delete key",
    });
  };

  return { exec, ...mutation };
}

export function deleteKeysByRef() {
  const { keys } = useTRPC();

  const mutationOptions = keys.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keys.findByData.queryKey();
      const findById = keys.findById.queryKey();
      const findByRef = keys.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByKeyRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting key...",
      success: "Key deleted successfully",
      error: "Failed to delete key",
    });
  };

  return { exec, ...mutation };
}
