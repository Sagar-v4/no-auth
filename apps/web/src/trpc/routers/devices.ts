import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneDeviceInput,
  InsertManyDeviceInput,
  FindByDeviceIdInput,
  FindByDeviceDataInput,
  UpdateByDeviceIdInput,
  UpdateByDeviceDataInput,
  DeleteByDeviceDataInput,
} from "@/lib/trpc/schemas/v1/devices";
import { useTRPC } from "@/trpc/server";
import { queryClient } from "@/trpc/provider";

export function createOneDeviceV1() {
  const { devicesV1 } = useTRPC();

  const mutationOptions = devicesV1.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    trpc: {
      abortOnUnmount: true,
      ssr: false,
    },
    onSettled: () => {
      const findByData = devicesV1.findByData.queryKey();
      const findById = devicesV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneDeviceInput) => {
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

export function createManyDeviceV1() {
  const { devicesV1 } = useTRPC();

  const mutationOptions = devicesV1.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devicesV1.findByData.queryKey();
      const findById = devicesV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyDeviceInput) => {
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

export function getDeviceByIdV1(input: FindByDeviceIdInput) {
  const { devicesV1 } = useTRPC();

  const queryOptions = devicesV1.findById.queryOptions(input, {
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

export function getDevicesByDataV1(input: FindByDeviceDataInput) {
  const { devicesV1 } = useTRPC();

  const queryOptions = devicesV1.findByData.queryOptions(input, {
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

export function updateDeviceByIdV1() {
  const { devicesV1 } = useTRPC();

  const mutationOptions = devicesV1.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devicesV1.findByData.queryKey();
      const findById = devicesV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByDeviceIdInput) => {
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

export function updateDevicesByDataV1() {
  const { devicesV1 } = useTRPC();

  const mutationOptions = devicesV1.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devicesV1.findByData.queryKey();
      const findById = devicesV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByDeviceDataInput) => {
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

export function deleteDevicesByDataV1() {
  const { devicesV1 } = useTRPC();

  const mutationOptions = devicesV1.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = devicesV1.findByData.queryKey();
      const findById = devicesV1.findById.queryKey();
      queryClient.invalidateQueries([findByData, findById] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByDeviceDataInput) => {
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
