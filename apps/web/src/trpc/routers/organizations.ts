import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneOrganizationInputType,
  InsertManyOrganizationInputType,
  FindByOrganizationIdInputType,
  FindByOrganizationDataInputType,
  FindByOrganizationRefInputType,
  UpdateByOrganizationIdInputType,
  UpdateByOrganizationDataInputType,
  DeleteByOrganizationDataInputType,
  DeleteByOrganizationRefInputType,
} from "@/lib/trpc/schemas/organizations";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneOrganization() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneOrganizationInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating organization...",
      success: "Organization created successfully",
      error: "Failed to create organization",
    });
  };

  return { exec, ...mutation };
}

export function createManyOrganization() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyOrganizationInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating organization...",
      success: "Organization created successfully",
      error: "Failed to create organization",
    });
  };

  return { exec, ...mutation };
}

export function getOrganizationById(input: FindByOrganizationIdInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findById.queryOptions(input, {
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
      loading: "Fetching organization...",
      error: "Failed to fetch organization",
    });
  };

  return { exec, ...query };
}

export function getOrganizationsByData(input: FindByOrganizationDataInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findByData.queryOptions(input, {
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
      loading: "Fetching organization...",
      error: "Failed to fetch organization",
    });
  };

  return { exec, ...query };
}

export function getOrganizationsByRef(input: FindByOrganizationRefInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findByRef.queryOptions(input, {
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
      loading: "Fetching organization...",
      error: "Failed to fetch organization",
    });
  };

  return { exec, ...query };
}

export function updateOrganizationById() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByOrganizationIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating organization...",
      success: "Organization updated successfully",
      error: "Failed to update organization",
    });
  };

  return { exec, ...mutation };
}

export function updateOrganizationsByData() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByOrganizationDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating organization...",
      success: "Organization updated successfully",
      error: "Failed to update organization",
    });
  };

  return { exec, ...mutation };
}

export function deleteOrganizationsByData() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByOrganizationDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting organization...",
      success: "Organization deleted successfully",
      error: "Failed to delete organization",
    });
  };

  return { exec, ...mutation };
}

export function deleteOrganizationsByRef() {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizations.findByData.queryKey();
      const findById = organizations.findById.queryKey();
      const findByRef = organizations.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByOrganizationRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting organization...",
      success: "Organization deleted successfully",
      error: "Failed to delete organization",
    });
  };

  return { exec, ...mutation };
}
