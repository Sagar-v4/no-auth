import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneOrganizationInput,
  InsertManyOrganizationInput,
  FindByOrganizationIdInput,
  FindByOrganizationDataInput,
  FindByOrganizationRefInput,
  UpdateByOrganizationIdInput,
  UpdateByOrganizationDataInput,
  DeleteByOrganizationDataInput,
  DeleteByOrganizationRefInput,
} from "@/lib/trpc/schemas/v1/organizations";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneOrganizationV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneOrganizationInput) => {
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

export function createManyOrganizationV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyOrganizationInput) => {
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

export function getOrganizationByIdV1(input: FindByOrganizationIdInput) {
  const { organizationsV1 } = useTRPC();

  const queryOptions = organizationsV1.findById.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    trpc: {
      abortOnUnmount: true,
      ssr: false,
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

export function getOrganizationsByDataV1(input: FindByOrganizationDataInput) {
  const { organizationsV1 } = useTRPC();

  const queryOptions = organizationsV1.findByData.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    // enabled: false,
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

export function getOrganizationsByRefV1(input: FindByOrganizationRefInput) {
  const { organizationsV1 } = useTRPC();

  const queryOptions = organizationsV1.findByRef.queryOptions(input, {
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

export function updateOrganizationByIdV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByOrganizationIdInput) => {
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

export function updateOrganizationsByDataV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByOrganizationDataInput) => {
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

export function deleteOrganizationsByDataV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByOrganizationDataInput) => {
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

export function deleteOrganizationsByRefV1() {
  const { organizationsV1 } = useTRPC();

  const mutationOptions = organizationsV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = organizationsV1.findByData.queryKey();
      const findById = organizationsV1.findById.queryKey();
      const findByRef = organizationsV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByOrganizationRefInput) => {
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
