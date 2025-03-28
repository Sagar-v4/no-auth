import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneSSOInput,
  InsertManySSOInput,
  FindBySSOIdInput,
  FindBySSODataInput,
  FindBySSORefInput,
  UpdateBySSOIdInput,
  UpdateBySSODataInput,
  DeleteBySSODataInput,
  DeleteBySSORefInput,
} from "@/lib/trpc/schemas/v1/sso";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneSSOV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneSSOInput) => {
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

export function createManySSOV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManySSOInput) => {
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

export function getSSOByIdV1(input: FindBySSOIdInput) {
  const { ssoV1 } = useTRPC();

  const queryOptions = ssoV1.findById.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    trpc: {
      abortOnUnmount: true,
      ssr: true,
    },
    select(data) {
      if (data)
        return {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
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

export function getSSOByDataV1(input: FindBySSODataInput) {
  const { ssoV1 } = useTRPC();

  const queryOptions = ssoV1.findByData.queryOptions(input, {
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
      loading: "Fetching sso...",
      error: "Failed to fetch sso",
    });
  };

  return { exec, ...query };
}

export function getSSOByRefV1(input: FindBySSORefInput) {
  const { ssoV1 } = useTRPC();

  const queryOptions = ssoV1.findByRef.queryOptions(input, {
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

export function updateSSOByIdV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySSOIdInput) => {
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

export function updateSSOByDataV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateBySSODataInput) => {
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

export function deleteSSOByDataV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySSODataInput) => {
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

export function deleteSSOByRefV1() {
  const { ssoV1 } = useTRPC();

  const mutationOptions = ssoV1.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = ssoV1.findByData.queryKey();
      const findById = ssoV1.findById.queryKey();
      const findByRef = ssoV1.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteBySSORefInput) => {
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
