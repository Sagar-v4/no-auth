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

export function createOneEmailApp(input: InsertOneEmailAppInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyEmailApp(input: InsertManyEmailAppInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getEmailAppById(input: FindByEmailAppIdInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findById.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
    select: (data) => {
      if (!data) return null;

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
    enabled: true,
  });

  const query = useQuery(queryOptions);

  const exec = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });
  };

  return { exec, ...query };
}

export function getEmailAppsByData(input: FindByEmailAppDataInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByData.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
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
    enabled: true,
  });

  const query = useQuery(queryOptions);

  const exec = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });
  };

  return { exec, ...query };
}

export function getEmailAppsByRef(input: FindByEmailAppRefInputType) {
  const { emailApps } = useTRPC();

  const queryOptions = emailApps.findByRef.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
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
    enabled: true,
  });

  const query = useQuery(queryOptions);

  const exec = async () => {
    const promise = query.refetch({
      cancelRefetch: false,
    });
  };

  return { exec, ...query };
}

export function updateEmailAppById(input: UpdateByEmailAppIdInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateEmailAppsByData(input: UpdateByEmailAppDataInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteEmailAppsByData(input: DeleteByEmailAppDataInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteEmailAppsByRef(input: DeleteByEmailAppRefInputType) {
  const { emailApps } = useTRPC();

  const mutationOptions = emailApps.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
