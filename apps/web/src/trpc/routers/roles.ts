import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneRoleInputType,
  InsertManyRoleInputType,
  FindByRoleIdInputType,
  FindByRoleDataInputType,
  FindByRoleRefInputType,
  UpdateByRoleIdInputType,
  UpdateByRoleDataInputType,
  DeleteByRoleDataInputType,
  DeleteByRoleRefInputType,
} from "@/lib/trpc/schemas/roles";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneRole() {
  const { roles } = useTRPC();

  const mutationOptions = roles.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneRoleInputType) => {
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

export function createManyRole() {
  const { roles } = useTRPC();

  const mutationOptions = roles.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyRoleInputType) => {
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

export function getRoleById(input: FindByRoleIdInputType) {
  const { roles } = useTRPC();

  const queryOptions = roles.findById.queryOptions(input, {
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

export function getRolesByData(input: FindByRoleDataInputType) {
  const { roles } = useTRPC();

  const queryOptions = roles.findByData.queryOptions(input, {
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

export function getRolesByRef(input: FindByRoleRefInputType) {
  const { roles } = useTRPC();

  const queryOptions = roles.findByRef.queryOptions(input, {
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

export function updateRoleById() {
  const { roles } = useTRPC();

  const mutationOptions = roles.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByRoleIdInputType) => {
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

export function updateRolesByData() {
  const { roles } = useTRPC();

  const mutationOptions = roles.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByRoleDataInputType) => {
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

export function deleteRolesByData() {
  const { roles } = useTRPC();

  const mutationOptions = roles.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByRoleDataInputType) => {
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

export function deleteRolesByRef() {
  const { roles } = useTRPC();

  const mutationOptions = roles.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = roles.findByData.queryKey();
      const findById = roles.findById.queryKey();
      const findByRef = roles.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByRoleRefInputType) => {
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
