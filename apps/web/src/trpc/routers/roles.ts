import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneRoleInput,
  InsertManyRoleInput,
  FindByRoleIdInput,
  FindByRoleDataInput,
  FindByRoleRefInput,
  UpdateByRoleIdInput,
  UpdateByRoleDataInput,
  DeleteByRoleDataInput,
  DeleteByRoleRefInput,
} from "@/lib/trpc/schemas/v1/roles";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneRoleV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneRoleInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating role...",
      success: "Role created successfully",
      error: "Failed to create role",
    });
  };

  return { exec, ...mutation };
}

export function createManyRoleV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyRoleInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating role...",
      success: "Role created successfully",
      error: "Failed to create role",
    });
  };

  return { exec, ...mutation };
}

export function getRoleByIdV1(input: FindByRoleIdInput) {
  const { rolesV1 } = useTRPC();

  const queryOptions = rolesV1.findById.queryOptions(input, {
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
      loading: "Fetching role...",
      error: "Failed to fetch role",
    });
  };

  return { exec, ...query };
}

export function getRolesByDataV1(input: FindByRoleDataInput) {
  const { rolesV1 } = useTRPC();

  const queryOptions = rolesV1.findByData.queryOptions(input, {
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
      loading: "Fetching role...",
      error: "Failed to fetch role",
    });
  };

  return { exec, ...query };
}

export function getRolesByRefV1(input: FindByRoleRefInput) {
  const { rolesV1 } = useTRPC();

  const queryOptions = rolesV1.findByRef.queryOptions(input, {
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
      loading: "Fetching role...",
      error: "Failed to fetch role",
    });
  };

  return { exec, ...query };
}

export function updateRoleByIdV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByRoleIdInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating role...",
      success: "Role updated successfully",
      error: "Failed to update role",
    });
  };

  return { exec, ...mutation };
}

export function updateRolesByDataV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByRoleDataInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating role...",
      success: "Role updated successfully",
      error: "Failed to update role",
    });
  };

  return { exec, ...mutation };
}

export function deleteRolesByDataV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByRoleDataInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting role...",
      success: "Role deleted successfully",
      error: "Failed to delete role",
    });
  };

  return { exec, ...mutation };
}

export function deleteRolesByRefV1() {
  const { rolesV1 } = useTRPC();

  const mutationOptions = rolesV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = rolesV1.findByData.queryKey();
      const findById = rolesV1.findById.queryKey();
      const findByRef = rolesV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByRoleRefInput) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting role...",
      success: "Role deleted successfully",
      error: "Failed to delete role",
    });
  };

  return { exec, ...mutation };
}
