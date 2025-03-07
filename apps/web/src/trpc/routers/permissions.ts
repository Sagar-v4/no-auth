import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOnePermissionInputType,
  InsertManyPermissionInputType,
  FindByPermissionIdInputType,
  FindByPermissionDataInputType,
  FindByPermissionRefInputType,
  UpdateByPermissionIdInputType,
  UpdateByPermissionDataInputType,
  DeleteByPermissionDataInputType,
  DeleteByPermissionRefInputType,
} from "@/lib/trpc/schemas/permissions";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOnePermission() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOnePermissionInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating permission...",
      success: "Permission created successfully",
      error: "Failed to create permission",
    });
  };

  return { exec, ...mutation };
}

export function createManyPermission() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyPermissionInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating permission...",
      success: "Permission created successfully",
      error: "Failed to create permission",
    });
  };

  return { exec, ...mutation };
}

export function getPermissionById(input: FindByPermissionIdInputType) {
  const { permissions } = useTRPC();

  const queryOptions = permissions.findById.queryOptions(input, {
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
      loading: "Fetching permission...",
      error: "Failed to fetch permission",
    });
  };

  return { exec, ...query };
}

export function getPermissionsByData(input: FindByPermissionDataInputType) {
  const { permissions } = useTRPC();

  const queryOptions = permissions.findByData.queryOptions(input, {
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
      loading: "Fetching permission...",
      error: "Failed to fetch permission",
    });
  };

  return { exec, ...query };
}

export function getPermissionsByRef(input: FindByPermissionRefInputType) {
  const { permissions } = useTRPC();

  const queryOptions = permissions.findByRef.queryOptions(input, {
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
      loading: "Fetching permission...",
      error: "Failed to fetch permission",
    });
  };

  return { exec, ...query };
}

export function updatePermissionById() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating permission...",
      success: "Permission updated successfully",
      error: "Failed to update permission",
    });
  };

  return { exec, ...mutation };
}

export function updatePermissionsByData() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating permission...",
      success: "Permission updated successfully",
      error: "Failed to update permission",
    });
  };

  return { exec, ...mutation };
}

export function deletePermissionsByData() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting permission...",
      success: "Permission deleted successfully",
      error: "Failed to delete permission",
    });
  };

  return { exec, ...mutation };
}

export function deletePermissionsByRef() {
  const { permissions } = useTRPC();

  const mutationOptions = permissions.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissions.findByData.queryKey();
      const findById = permissions.findById.queryKey();
      const findByRef = permissions.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting permission...",
      success: "Permission deleted successfully",
      error: "Failed to delete permission",
    });
  };

  return { exec, ...mutation };
}
