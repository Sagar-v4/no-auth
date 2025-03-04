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
  CLIENT: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Client Document not found",
    },
  },
  CLIENTELE: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Clientele Document not found",
    },
  },
  ORGANIZATION: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Organization Document not found",
    },
  },
  EMAIL_APP: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Email App Document not found",
    },
  },
  KEY: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Key Document not found",
    },
  },
  DEVICE: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Device Document not found",
    },
  },
  FORM: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Form Document not found",
    },
  },
  SESSION: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Session Document not found",
    },
  },
};
