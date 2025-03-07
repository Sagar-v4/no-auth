import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOnePermissionGroupInputType,
  InsertManyPermissionGroupInputType,
  FindByPermissionGroupIdInputType,
  FindByPermissionGroupDataInputType,
  FindByPermissionGroupRefInputType,
  UpdateByPermissionGroupIdInputType,
  UpdateByPermissionGroupDataInputType,
  DeleteByPermissionGroupDataInputType,
  DeleteByPermissionGroupRefInputType,
} from "@/lib/trpc/schemas/permission-groups";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOnePermissionGroup() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOnePermissionGroupInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating permission group...",
      success: "Permission Group created successfully",
      error: "Failed to create permission group",
    });
  };

  return { exec, ...mutation };
}

export function createManyPermissionGroup() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyPermissionGroupInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating permission group...",
      success: "Permission Group created successfully",
      error: "Failed to create permission group",
    });
  };

  return { exec, ...mutation };
}

export function getPermissionGroupById(
  input: FindByPermissionGroupIdInputType,
) {
  const { permissionGroups } = useTRPC();

  const queryOptions = permissionGroups.findById.queryOptions(input, {
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
      loading: "Fetching permission group...",
      error: "Failed to fetch permission group",
    });
  };

  return { exec, ...query };
}

export function getPermissionGroupsByData(
  input: FindByPermissionGroupDataInputType,
) {
  const { permissionGroups } = useTRPC();

  const queryOptions = permissionGroups.findByData.queryOptions(input, {
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
      loading: "Fetching permission group...",
      error: "Failed to fetch permission group",
    });
  };

  return { exec, ...query };
}

export function getPermissionGroupsByRef(
  input: FindByPermissionGroupRefInputType,
) {
  const { permissionGroups } = useTRPC();

  const queryOptions = permissionGroups.findByRef.queryOptions(input, {
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
      loading: "Fetching permission group...",
      error: "Failed to fetch permission group",
    });
  };

  return { exec, ...query };
}

export function updatePermissionGroupById() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionGroupIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating permission group...",
      success: "Permission Group updated successfully",
      error: "Failed to update permission group",
    });
  };

  return { exec, ...mutation };
}

export function updatePermissionGroupsByData() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionGroupDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating permission group...",
      success: "Permission Group updated successfully",
      error: "Failed to update permission group",
    });
  };

  return { exec, ...mutation };
}

export function deletePermissionGroupsByData() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionGroupDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting permission group...",
      success: "Permission Group deleted successfully",
      error: "Failed to delete permission group",
    });
  };

  return { exec, ...mutation };
}

export function deletePermissionGroupsByRef() {
  const { permissionGroups } = useTRPC();

  const mutationOptions = permissionGroups.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionGroups.findByData.queryKey();
      const findById = permissionGroups.findById.queryKey();
      const findByRef = permissionGroups.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionGroupRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting permission group...",
      success: "Permission Group deleted successfully",
      error: "Failed to delete permission group",
    });
  };

  return { exec, ...mutation };
}
