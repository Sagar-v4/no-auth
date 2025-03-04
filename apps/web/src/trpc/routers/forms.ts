import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  InsertOneFormInputType,
  InsertManyFormInputType,
  FindByFormIdInputType,
  FindByFormDataInputType,
  FindByFormRefInputType,
  UpdateByFormIdInputType,
  UpdateByFormDataInputType,
  DeleteByFormDataInputType,
  DeleteByFormRefInputType,
} from "@/lib/trpc/schemas/forms";
import { useTRPC } from "@/trpc/server";

export function createOneForm(input: InsertOneFormInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function createManyForm(input: InsertManyFormInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function getFormById(input: FindByFormIdInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findById.queryOptions(input, {
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

export function getFormsByData(input: FindByFormDataInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findByData.queryOptions(input, {
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

export function getFormsByRef(input: FindByFormRefInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findByRef.queryOptions(input, {
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

export function updateFormById(input: UpdateByFormIdInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function updateFormsByData(input: UpdateByFormDataInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteFormsByData(input: DeleteByFormDataInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}

export function deleteFormsByRef(input: DeleteByFormRefInputType) {
  const { forms } = useTRPC();

  const mutationOptions = forms.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  const mutation = useMutation(mutationOptions);

  const exec = async () => {
    const promise = mutation.mutateAsync(input);
  };

  return { exec, ...mutation };
}
