import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneDeviceInputType,
  InsertManyDeviceInputType,
  FindByDeviceIdInputType,
  FindByDeviceDataInputType,
  UpdateByDeviceIdInputType,
  UpdateByDeviceDataInputType,
  DeleteByDeviceDataInputType,
} from "@/lib/trpc/schemas/devices";
import { useTRPC } from "@/trpc/server";

export function createOneDevice(input: InsertOneDeviceInputType) {
  const { devices } = useTRPC();

  const mutationOptions = devices.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyDevice(input: InsertManyDeviceInputType) {
  const { devices } = useTRPC();

  const mutationOptions = devices.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getDeviceById(input: FindByDeviceIdInputType) {
  const { devices } = useTRPC();

  const queryOptions = devices.findById.queryOptions(input, {
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

export function getDevicesByData(input: FindByDeviceDataInputType) {
  const { devices } = useTRPC();

  const queryOptions = devices.findByData.queryOptions(input, {
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

export function updateDeviceById(input: UpdateByDeviceIdInputType) {
  const { devices } = useTRPC();

  const mutationOptions = devices.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateDevicesByData(input: UpdateByDeviceDataInputType) {
  const { devices } = useTRPC();

  const mutationOptions = devices.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteDevicesByData(input: DeleteByDeviceDataInputType) {
  const { devices } = useTRPC();

  const mutationOptions = devices.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
