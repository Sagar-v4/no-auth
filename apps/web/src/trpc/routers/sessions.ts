import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneSessionInputType,
  InsertManySessionInputType,
  FindBySessionIdInputType,
  FindBySessionDataInputType,
  FindBySessionRefInputType,
  UpdateBySessionIdInputType,
  UpdateBySessionDataInputType,
  DeleteBySessionDataInputType,
  DeleteBySessionRefInputType,
} from "@/lib/trpc/schemas/sessions";
import { useTRPC } from "@/trpc/server";

export function createOneSession(input: InsertOneSessionInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManySession(input: InsertManySessionInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getSessionById(input: FindBySessionIdInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findById.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
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

export function getSessionsByData(input: FindBySessionDataInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findByData.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
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

export function getSessionsByRef(input: FindBySessionRefInputType) {
  const { sessions } = useTRPC();

  const queryOptions = sessions.findByRef.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min
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

export function updateSessionById(input: UpdateBySessionIdInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateSessionsByData(input: UpdateBySessionDataInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteSessionsByData(input: DeleteBySessionDataInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteSessionsByRef(input: DeleteBySessionRefInputType) {
  const { sessions } = useTRPC();

  const mutationOptions = sessions.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
