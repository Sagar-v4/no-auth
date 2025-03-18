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
  SSO: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "SSO Document not found",
    },
  },
  ROLE: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Role Document not found",
    },
  },
  PERMISSION: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Permission Document not found",
    },
  },
  PERMISSION_GROUP: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "Permission Group Document not found",
    },
  },
};
