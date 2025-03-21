import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneKeyInput,
  InsertManyKeyInput,
  FindByKeyIdInput,
  FindByKeyDataInput,
  FindByKeyRefInput,
  UpdateByKeyIdInput,
  UpdateByKeyDataInput,
  DeleteByKeyDataInput,
  DeleteByKeyRefInput,
} from "@/lib/trpc/schemas/v1/keys";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneKeyV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneKeyInput) => {
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

export function createManyKeyV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyKeyInput) => {
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

export function getKeyByIdV1(input: FindByKeyIdInput) {
  const { keysV1 } = useTRPC();

  const queryOptions = keysV1.findById.queryOptions(input, {
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

export function getKeysByDataV1(input: FindByKeyDataInput) {
  const { keysV1 } = useTRPC();

  const queryOptions = keysV1.findByData.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    // enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    trpc: {
      abortOnUnmount: true,
      ssr: true,
    },
    select(data) {
      return data.map((d) => ({
        ...d,
        createdAt: new Date(d.createdAt),
        updatedAt: new Date(d.updatedAt),
      }));
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

export function getKeysByRefV1(input: FindByKeyRefInput) {
  const { keysV1 } = useTRPC();

  const queryOptions = keysV1.findByRef.queryOptions(input, {
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

export function updateKeyByIdV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByKeyIdInput) => {
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

export function updateKeysByDataV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByKeyDataInput) => {
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

export function deleteKeysByDataV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByKeyDataInput) => {
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

export function deleteKeysByRefV1() {
  const { keysV1 } = useTRPC();

  const mutationOptions = keysV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = keysV1.findByData.queryKey();
      const findById = keysV1.findById.queryKey();
      const findByRef = keysV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByKeyRefInput) => {
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
