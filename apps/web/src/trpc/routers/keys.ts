import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneKeyInputType,
  InsertManyKeyInputType,
  FindByKeyIdInputType,
  FindByKeyDataInputType,
  FindByKeyRefInputType,
  UpdateByKeyIdInputType,
  UpdateByKeyDataInputType,
  DeleteByKeyDataInputType,
  DeleteByKeyRefInputType,
} from "@/lib/trpc/schemas/keys";
import { useTRPC } from "@/trpc/server";

export function createOneKey(input: InsertOneKeyInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyKey(input: InsertManyKeyInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getKeyById(input: FindByKeyIdInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findById.queryOptions(input, {
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

export function getKeysByData(input: FindByKeyDataInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findByData.queryOptions(input, {
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

export function getKeysByRef(input: FindByKeyRefInputType) {
  const { keys } = useTRPC();

  const queryOptions = keys.findByRef.queryOptions(input, {
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

export function updateKeyById(input: UpdateByKeyIdInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateKeysByData(input: UpdateByKeyDataInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteKeysByData(input: DeleteByKeyDataInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteKeysByRef(input: DeleteByKeyRefInputType) {
  const { keys } = useTRPC();

  const mutationOptions = keys.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
