import { toast } from "sonner";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  InsertOneUserInputType,
  InsertManyUserInputType,
  FindByUserIdInputType,
  FindByUserDataInputType,
  UpdateByUserIdInputType,
  UpdateByUserDataInputType,
  DeleteByUserDataInputType,
} from "@/lib/trpc/schemas/users";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneUser() {
  const { users } = useTRPC();

  const mutationOptions = users.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = users.findByData.queryKey();
      const findById = users.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneUserInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating user...",
      success: "User created successfully",
      error: "Failed to create user",
    });
  };

  return { exec, ...mutation };
}

export function createManyUser() {
  const { users } = useTRPC();

  const mutationOptions = users.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = users.findByData.queryKey();
      const findById = users.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyUserInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating user...",
      success: "User created successfully",
      error: "Failed to create user",
    });
  };

  return { exec, ...mutation };
}

export function getUserById(input: FindByUserIdInputType) {
  const { users } = useTRPC();

  const queryOptions = users.findById.queryOptions(input, {
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
      loading: "Fetching user...",
      error: "Failed to fetch user",
    });
  };

  return { exec, ...query };
}

export function getUsersByData(input: FindByUserDataInputType) {
  const { users } = useTRPC();

  const queryOptions = users.findByData.queryOptions(input, {
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
      loading: "Fetching user...",
      error: "Failed to fetch user",
    });
  };

  return { exec, ...query };
}

export function updateUserById() {
  const { users } = useTRPC();

  const mutationOptions = users.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = users.findByData.queryKey();
      const findById = users.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByUserIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating user...",
      success: "User updated successfully",
      error: "Failed to update user",
    });
  };

  return { exec, ...mutation };
}

export function updateUsersByData() {
  const { users } = useTRPC();

  const mutationOptions = users.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = users.findByData.queryKey();
      const findById = users.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByUserDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating user...",
      success: "User updated successfully",
      error: "Failed to update user",
    });
  };

  return { exec, ...mutation };
}

export function deleteUsersByData() {
  const { users } = useTRPC();

  const mutationOptions = users.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = users.findByData.queryKey();
      const findById = users.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByUserDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
    });
  };

  return { exec, ...mutation };
}
