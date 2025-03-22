import { toast } from "sonner";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  InsertOneUserInput,
  InsertManyUserInput,
  FindByUserIdInput,
  FindByUserDataInput,
  UpdateByUserIdInput,
  UpdateByUserDataInput,
  DeleteByUserDataInput,
} from "@/lib/trpc/schemas/v1/users";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneUserV1() {
  const { usersV1 } = useTRPC();

  const mutationOptions = usersV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = usersV1.findByData.queryKey();
      const findById = usersV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneUserInput) => {
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

export function createManyUserV1() {
  const { usersV1 } = useTRPC();

  const mutationOptions = usersV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = usersV1.findByData.queryKey();
      const findById = usersV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyUserInput) => {
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

export function getUserByIdV1(input: FindByUserIdInput) {
  const { usersV1 } = useTRPC();

  const queryOptions = usersV1.findById.queryOptions(input, {
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

export function getUsersByDataV1(input: FindByUserDataInput) {
  const { usersV1 } = useTRPC();

  const queryOptions = usersV1.findByData.queryOptions(input, {
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

export function updateUserByIdV1() {
  const { usersV1 } = useTRPC();

  const mutationOptions = usersV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = usersV1.findByData.queryKey();
      const findById = usersV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByUserIdInput) => {
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

export function updateUsersByDataV1() {
  const { usersV1 } = useTRPC();

  const mutationOptions = usersV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = usersV1.findByData.queryKey();
      const findById = usersV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByUserDataInput) => {
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

export function deleteUsersByDataV1() {
  const { usersV1 } = useTRPC();

  const mutationOptions = usersV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = usersV1.findByData.queryKey();
      const findById = usersV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByUserDataInput) => {
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
