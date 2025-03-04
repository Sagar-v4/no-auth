import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneOrganizationInputType,
  InsertManyOrganizationInputType,
  FindByOrganizationIdInputType,
  FindByOrganizationDataInputType,
  FindByOrganizationRefInputType,
  UpdateByOrganizationIdInputType,
  UpdateByOrganizationDataInputType,
  DeleteByOrganizationDataInputType,
  DeleteByOrganizationRefInputType,
} from "@/lib/trpc/schemas/organizations";
import { useTRPC } from "@/trpc/server";

export function createOneOrganization(input: InsertOneOrganizationInputType) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyOrganization(input: InsertManyOrganizationInputType) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getOrganizationById(input: FindByOrganizationIdInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findById.queryOptions(input, {
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

    toast.promise(promise, {
      richColors: true,
      position: "top-right",
      success: (data) => {
        return `${data.data?._id} fetched`;
      },
      error: (data) => {
        return {
          message: `Failed to fetch ${data._id}`,
        };
      },
      finally() {
        // toast.message("done");
      },

      loading: "Fetching Organization Data...",
    });
  };

  return { exec, ...query };
}

export function getOrganizationsByData(input: FindByOrganizationDataInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findByData.queryOptions(input, {
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

export function getOrganizationsByRef(input: FindByOrganizationRefInputType) {
  const { organizations } = useTRPC();

  const queryOptions = organizations.findByRef.queryOptions(input, {
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

export function updateOrganizationById(input: UpdateByOrganizationIdInputType) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateOrganizationsByData(
  input: UpdateByOrganizationDataInputType,
) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteOrganizationsByData(
  input: DeleteByOrganizationDataInputType,
) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteOrganizationsByRef(
  input: DeleteByOrganizationRefInputType,
) {
  const { organizations } = useTRPC();

  const mutationOptions = organizations.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
