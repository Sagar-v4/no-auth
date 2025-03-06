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
import { queryClient } from "@/trpc/provider";

export function createOneForm() {
  const { forms } = useTRPC();

  const mutationOptions = forms.insertOne.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertOneFormInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating form...",
      success: "Form created successfully",
      error: "Failed to create form",
    });
  };

  return { exec, ...mutation };
}

export function createManyForm() {
  const { forms } = useTRPC();

  const mutationOptions = forms.insertMany.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: InsertManyFormInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Creating form...",
      success: "Form created successfully",
      error: "Failed to create form",
    });
  };

  return { exec, ...mutation };
}

export function getFormById(input: FindByFormIdInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findById.queryOptions(input, {
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
      loading: "Fetching form...",
      error: "Failed to fetch form",
    });
  };

  return { exec, ...query };
}

export function getFormsByData(input: FindByFormDataInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findByData.queryOptions(input, {
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
      loading: "Fetching form...",
      error: "Failed to fetch form",
    });
  };

  return { exec, ...query };
}

export function getFormsByRef(input: FindByFormRefInputType) {
  const { forms } = useTRPC();

  const queryOptions = forms.findByRef.queryOptions(input, {
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
      loading: "Fetching form...",
      error: "Failed to fetch form",
    });
  };

  return { exec, ...query };
}

export function updateFormById() {
  const { forms } = useTRPC();

  const mutationOptions = forms.updateById.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByFormIdInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating form...",
      success: "Form updated successfully",
      error: "Failed to update form",
    });
  };

  return { exec, ...mutation };
}

export function updateFormsByData() {
  const { forms } = useTRPC();

  const mutationOptions = forms.updateByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: UpdateByFormDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Updating form...",
      success: "Form updated successfully",
      error: "Failed to update form",
    });
  };

  return { exec, ...mutation };
}

export function deleteFormsByData() {
  const { forms } = useTRPC();

  const mutationOptions = forms.deleteByData.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByFormDataInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting form...",
      success: "Form deleted successfully",
      error: "Failed to delete form",
    });
  };

  return { exec, ...mutation };
}

export function deleteFormsByRef() {
  const { forms } = useTRPC();

  const mutationOptions = forms.deleteByRef.mutationOptions({
    retry: 2,
    retryDelay: (retryCount) => retryCount * 1000,
    onSettled: () => {
      const findByData = forms.findByData.queryKey();
      const findById = forms.findById.queryKey();
      const findByRef = forms.findByRef.queryKey();
      queryClient.invalidateQueries([findByData, findById, findByRef] as any);
    },
  });

  const mutation = useMutation(mutationOptions);

  const exec = async (input: DeleteByFormRefInputType) => {
    const promise = mutation.mutateAsync(input);

    toast.promise(promise, {
      richColors: true,
      loading: "Deleting form...",
      success: "Form deleted successfully",
      error: "Failed to delete form",
    });
  };

  return { exec, ...mutation };
}
