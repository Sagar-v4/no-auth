import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOnePermissionInput,
  InsertManyPermissionInput,
  FindByPermissionIdInput,
  FindByPermissionDataInput,
  FindByPermissionRefInput,
  UpdateByPermissionIdInput,
  UpdateByPermissionDataInput,
  DeleteByPermissionDataInput,
  DeleteByPermissionRefInput,
} from "@/lib/trpc/schemas/v1/permissions";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOnePermissionV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOnePermissionInput) => {
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

export function createManyPermissionV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyPermissionInput) => {
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

export function getPermissionByIdV1(input: FindByPermissionIdInput) {
  const { permissionsV1 } = useTRPC();

  const queryOptions = permissionsV1.findById.queryOptions(input, {
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

export function getPermissionsByDataV1(input: FindByPermissionDataInput) {
  const { permissionsV1 } = useTRPC();

  const queryOptions = permissionsV1.findByData.queryOptions(input, {
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

export function getPermissionsByRefV1(input: FindByPermissionRefInput) {
  const { permissionsV1 } = useTRPC();

  const queryOptions = permissionsV1.findByRef.queryOptions(input, {
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

export function updatePermissionByIdV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionIdInput) => {
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

export function updatePermissionsByDataV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByPermissionDataInput) => {
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

export function deletePermissionsByDataV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionDataInput) => {
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

export function deletePermissionsByRefV1() {
  const { permissionsV1 } = useTRPC();

  const mutationOptions = permissionsV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = permissionsV1.findByData.queryKey();
      const findById = permissionsV1.findById.queryKey();
      const findByRef = permissionsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByPermissionRefInput) => {
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
