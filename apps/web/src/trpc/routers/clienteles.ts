import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneClienteleInputType,
  InsertManyClienteleInputType,
  FindByClienteleIdInputType,
  FindByClienteleDataInputType,
  FindByClienteleRefInputType,
  UpdateByClienteleIdInputType,
  UpdateByClienteleDataInputType,
  DeleteByClienteleDataInputType,
  DeleteByClienteleRefInputType,
} from "@/lib/trpc/schemas/clienteles";
import { useTRPC } from "@/trpc/server";

export function createOneClientele(input: InsertOneClienteleInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyClientele(input: InsertManyClienteleInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getClienteleById(input: FindByClienteleIdInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findById.queryOptions(input, {
    staleTime: 60 * 1000, // 1 min
    refetchInterval: 60 * 1000, // 1 min]
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

export function getClientelesByData(input: FindByClienteleDataInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findByData.queryOptions(input, {
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

export function getClientelesByRef(input: FindByClienteleRefInputType) {
  const { clienteles } = useTRPC();

  const queryOptions = clienteles.findByRef.queryOptions(input, {
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

export function updateClienteleById(input: UpdateByClienteleIdInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateClientelesByData(input: UpdateByClienteleDataInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteClientelesByData(input: DeleteByClienteleDataInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteClientelesByRef(input: DeleteByClienteleRefInputType) {
  const { clienteles } = useTRPC();

  const mutationOptions = clienteles.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
