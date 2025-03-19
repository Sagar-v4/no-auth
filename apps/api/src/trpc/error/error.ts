import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

export const ERROR: {
  [key: string]: {
    [key: string]: {
      message?: string;
      code: TRPC_ERROR_CODE_KEY;
      cause?: unknown;
    };
  };
} = {
  BASIC: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Document not found",
    },
    INVALID_SCHEMA: {
      code: "BAD_REQUEST",
      message: "Invalid schema name",
    },
  },
};
