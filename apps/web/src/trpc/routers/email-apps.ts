import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneEmailAppInputType,
  InsertManyEmailAppInputType,
  FindByEmailAppIdInputType,
  FindByEmailAppDataInputType,
  FindByEmailAppRefInputType,
  UpdateByEmailAppIdInputType,
  UpdateByEmailAppDataInputType,
  DeleteByEmailAppDataInputType,
  DeleteByEmailAppRefInputType,
} from "@/lib/trpc/schemas/email/apps";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneEmailApp() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneEmailAppInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating email app...",
      success: "Email app created successfully",
      error: "Failed to create email app",
    });
  };

  return { exec, ...mutation };
}

export function createManyEmailApp() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyEmailAppInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating email app...",
      success: "Email app created successfully",
      error: "Failed to create email app",
    });
  };

  return { exec, ...mutation };
}

export function getEmailAppById(input: FindByEmailAppIdInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findById.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    select: (data) => {
      if (!data) return undefined;
      return {
        ...data,
        updatedAt: new Date(data.updatedAt),
        createdAt: new Date(data.createdAt),
      };
    },
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
      loading: "Fetching email app...",
      error: "Failed to fetch email app",
    });
  };

  return { exec, ...query };
}

export function getEmailAppsByData(input: FindByEmailAppDataInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByData.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    select: (arr) => {
      return arr.map((data) => ({
        ...data,
        updatedAt: new Date(data.updatedAt),
        createdAt: new Date(data.createdAt),
      }));
    },
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
      loading: "Fetching email app...",
      error: "Failed to fetch email app",
    });
  };

  return { exec, ...query };
}

export function getEmailAppsByRef(input: FindByEmailAppRefInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByRef.queryOptions(input, {
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    enabled: false,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchInterval: 1000 * 60 * 10, // 10 min
    select: (arr) => {
      return arr.map((data) => ({
        ...data,
        updatedAt: new Date(data.updatedAt),
        createdAt: new Date(data.createdAt),
      }));
    },
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
      loading: "Fetching email app...",
      error: "Failed to fetch email app",
    });
  };

  return { exec, ...query };
}

export function updateEmailAppById() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByEmailAppIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating email app...",
      success: "Email app updated successfully",
      error: "Failed to update email app",
    });
  };

  return { exec, ...mutation };
}

export function updateEmailAppsByData() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByEmailAppDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating email app...",
      success: "Email app updated successfully",
      error: "Failed to update email app",
    });
  };

  return { exec, ...mutation };
}

export function deleteEmailAppsByData() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByEmailAppDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting email app...",
      success: "Email app deleted successfully",
      error: "Failed to delete email app",
    });
  };

  return { exec, ...mutation };
}

export function deleteEmailAppsByRef() {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = emailApps.findByData.queryKey();
      const findById = emailApps.findById.queryKey();
      const findByRef = emailApps.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByEmailAppRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting email app...",
      success: "Email app deleted successfully",
      error: "Failed to delete email app",
    });
  };

  return { exec, ...mutation };
}
