import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneSessionInputType,
  InsertManySessionInputType,
  FindBySessionIdInputType,
  FindBySessionDataInputType,
  FindBySessionRefInputType,
  UpdateBySessionIdInputType,
  UpdateBySessionDataInputType,
  DeleteBySessionDataInputType,
  DeleteBySessionRefInputType,
} from "@/lib/trpc/schemas/sessions";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneSession() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneSessionInputType) => {
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

export function createManySession() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManySessionInputType) => {
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

export function getSessionById(input: FindBySessionIdInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findById.queryOptions(input, {
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

export function getSessionsByData(input: FindBySessionDataInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findByData.queryOptions(input, {
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

export function getSessionsByRef(input: FindBySessionRefInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findByRef.queryOptions(input, {
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

export function updateSessionById() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySessionIdInputType) => {
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

export function updateSessionsByData() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySessionDataInputType) => {
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

export function deleteSessionsByData() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySessionDataInputType) => {
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

export function deleteSessionsByRef() {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sessions.findByData.queryKey();
      const findById = sessions.findById.queryKey();
      const findByRef = sessions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySessionRefInputType) => {
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
