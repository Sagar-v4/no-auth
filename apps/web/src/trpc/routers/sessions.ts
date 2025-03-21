import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneSessionInput,
  InsertManySessionInput,
  FindBySessionIdInput,
  FindBySessionDataInput,
  FindBySessionRefInput,
  UpdateBySessionIdInput,
  UpdateBySessionDataInput,
  DeleteBySessionDataInput,
  DeleteBySessionRefInput,
} from "@/lib/trpc/schemas/v1/sessions";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneSessionV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneSessionInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating session...",
      success: "Session created successfully",
      error: "Failed to create session",
    });
  };

  return { exec, ...mutation };
}

export function createManySessionV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManySessionInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating session...",
      success: "Session created successfully",
      error: "Failed to create session",
    });
  };

  return { exec, ...mutation };
}

export function getSessionByIdV1(input: FindBySessionIdInput) {
  const { sessionsV1 } = useTRPC();

  const queryOptions = sessionsV1.findById.queryOptions(input, {
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
      loading: "Fetching session...",
      error: "Failed to fetch session",
    });
  };

  return { exec, ...query };
}

export function getSessionsByDataV1(input: FindBySessionDataInput) {
  const { sessionsV1 } = useTRPC();

  const queryOptions = sessionsV1.findByData.queryOptions(input, {
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
      loading: "Fetching session...",
      error: "Failed to fetch session",
    });
  };

  return { exec, ...query };
}

export function getSessionsByRefV1(input: FindBySessionRefInput) {
  const { sessionsV1 } = useTRPC();

  const queryOptions = sessionsV1.findByRef.queryOptions(input, {
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
      loading: "Fetching session...",
      error: "Failed to fetch session",
    });
  };

  return { exec, ...query };
}

export function updateSessionByIdV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySessionIdInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating session...",
      success: "Session updated successfully",
      error: "Failed to update session",
    });
  };

  return { exec, ...mutation };
}

export function updateSessionsByDataV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySessionDataInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating session...",
      success: "Session updated successfully",
      error: "Failed to update session",
    });
  };

  return { exec, ...mutation };
}

export function deleteSessionsByDataV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySessionDataInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting session...",
      success: "Session deleted successfully",
      error: "Failed to delete session",
    });
  };

  return { exec, ...mutation };
}

export function deleteSessionsByRefV1() {
  const { sessionsV1 } = useTRPC();

  const mutationOptions = sessionsV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessionsV1.findByData.queryKey();
      const findById = sessionsV1.findById.queryKey();
      const findByRef = sessionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySessionRefInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting session...",
      success: "Session deleted successfully",
      error: "Failed to delete session",
    });
  };

  return { exec, ...mutation };
}
