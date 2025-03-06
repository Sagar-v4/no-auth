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
import { queryClient } from "@/trpc/provider";

export function createOneDevice() {
  const { devices } = useTRPC();

  const mutationOptions = devices.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devices.findByData.queryKey();
      const findById = devices.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneDeviceInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating device...",
      success: "Device created successfully",
      error: "Failed to create device",
    });
  };

  return { exec, ...mutation };
}

export function createManyDevice() {
  const { devices } = useTRPC();

  const mutationOptions = devices.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devices.findByData.queryKey();
      const findById = devices.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyDeviceInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating device...",
      success: "Device created successfully",
      error: "Failed to create device",
    });
  };

  return { exec, ...mutation };
}

export function getDeviceById(input: FindByDeviceIdInputType) {
  const { devices } = useTRPC();

  const queryOptions = devices.findById.queryOptions(input, {
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
      loading: "Fetching device...",
      error: "Failed to fetch device",
    });
  };

  return { exec, ...query };
}

export function getDevicesByData(input: FindByDeviceDataInputType) {
  const { devices } = useTRPC();

  const queryOptions = devices.findByData.queryOptions(input, {
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
      loading: "Fetching device...",
      error: "Failed to fetch device",
    });
  };

  return { exec, ...query };
}

export function updateDeviceById() {
  const { devices } = useTRPC();

  const mutationOptions = devices.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devices.findByData.queryKey();
      const findById = devices.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByDeviceIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating device...",
      success: "Device updated successfully",
      error: "Failed to update device",
    });
  };

  return { exec, ...mutation };
}

export function updateDevicesByData() {
  const { devices } = useTRPC();

  const mutationOptions = devices.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devices.findByData.queryKey();
      const findById = devices.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByDeviceDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating device...",
      success: "Device updated successfully",
      error: "Failed to update device",
    });
  };

  return { exec, ...mutation };
}

export function deleteDevicesByData() {
  const { devices } = useTRPC();

  const mutationOptions = devices.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devices.findByData.queryKey();
      const findById = devices.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByDeviceDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting device...",
      success: "Device deleted successfully",
      error: "Failed to delete device",
    });
  };

  return { exec, ...mutation };
}
