import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneSSOInputType,
  InsertManySSOInputType,
  FindBySSOIdInputType,
  FindBySSODataInputType,
  FindBySSORefInputType,
  UpdateBySSOIdInputType,
  UpdateBySSODataInputType,
  DeleteBySSODataInputType,
  DeleteBySSORefInputType,
} from "@/lib/trpc/schemas/sso";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneSSO() {
  const { sso } = useTRPC();

  const mutationOptions = sso.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneSSOInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating sso...",
      success: "SSO created successfully",
      error: "Failed to create sso",
    });
  };

  return { exec, ...mutation };
}

export function createManySSO() {
  const { sso } = useTRPC();

  const mutationOptions = sso.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManySSOInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating sso...",
      success: "SSO created successfully",
      error: "Failed to create sso",
    });
  };

  return { exec, ...mutation };
}

export function getSSOById(input: FindBySSOIdInputType) {
  const { sso } = useTRPC();

  const queryOptions = sso.findById.queryOptions(input, {
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
      loading: "Fetching sso...",
      error: "Failed to fetch sso",
    });
  };

  return { exec, ...query };
}

export function getSSOByData(input: FindBySSODataInputType) {
  const { sso } = useTRPC();

  const queryOptions = sso.findByData.queryOptions(input, {
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
      loading: "Fetching sso...",
      error: "Failed to fetch sso",
    });
  };

  return { exec, ...query };
}

export function getSSOByRef(input: FindBySSORefInputType) {
  const { sso } = useTRPC();

  const queryOptions = sso.findByRef.queryOptions(input, {
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
      loading: "Fetching sso...",
      error: "Failed to fetch sso",
    });
  };

  return { exec, ...query };
}

export function updateSSOById() {
  const { sso } = useTRPC();

  const mutationOptions = sso.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySSOIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating sso...",
      success: "SSO updated successfully",
      error: "Failed to update sso",
    });
  };

  return { exec, ...mutation };
}

export function updateSSOByData() {
  const { sso } = useTRPC();

  const mutationOptions = sso.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySSODataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating sso...",
      success: "SSO updated successfully",
      error: "Failed to update sso",
    });
  };

  return { exec, ...mutation };
}

export function deleteSSOByData() {
  const { sso } = useTRPC();

  const mutationOptions = sso.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySSODataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting sso...",
      success: "SSO deleted successfully",
      error: "Failed to delete sso",
    });
  };

  return { exec, ...mutation };
}

export function deleteSSOByRef() {
  const { sso } = useTRPC();

  const mutationOptions = sso.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = sso.findByData.queryKey();
      const findById = sso.findById.queryKey();
      const findByRef = sso.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySSORefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting sso...",
      success: "SSO deleted successfully",
      error: "Failed to delete sso",
    });
  };

  return { exec, ...mutation };
}
