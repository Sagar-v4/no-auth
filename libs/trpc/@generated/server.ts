import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  devicesV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({}),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      sessions: z.record(
        z.string().uuid().nonempty(),
        z.object({
          jti: z.string().uuid().nonempty(),
          users: z.record(
            z.string().uuid().nonempty(),
            z.object({
              log_in_at: z.date(),
            }),
          ),
        }),
      ).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({})),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      sessions: z.record(
        z.string().uuid().nonempty(),
        z.object({
          jti: z.string().uuid().nonempty(),
          users: z.record(
            z.string().uuid().nonempty(),
            z.object({
              log_in_at: z.date(),
            }),
          ),
        }),
      ).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        sessions: z.record(
          z.string().uuid().nonempty(),
          z.object({
            jti: z.string().uuid().nonempty(),
            users: z.record(
              z.string().uuid().nonempty(),
              z.object({
                log_in_at: z.date(),
              }),
            ),
          }),
        ).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      sessions: z.record(
        z.string().uuid().nonempty(),
        z.object({
          jti: z.string().uuid().nonempty(),
          users: z.record(
            z.string().uuid().nonempty(),
            z.object({
              log_in_at: z.date(),
            }),
          ),
        }),
      ).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findDeviceUsers: publicProcedure.input(z.object({
      filter: z
        .object({
          sso_uuid: z.string().uuid().nonempty(),
          device_uuid: z.string().uuid().nonempty(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.array(
      z.object({
        active: z.boolean(),
        log_in_at: z.date(),
        name: z.string().nonempty(),
        uuid: z.string().uuid().nonempty(),
        email: z.string().email().nonempty(),
      }),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        sessions: z.record(
          z.string().uuid().nonempty(),
          z.object({
            jti: z.string().uuid().nonempty(),
            users: z.record(
              z.string().uuid().nonempty(),
              z.object({
                log_in_at: z.date(),
              }),
            ),
          }),
        ).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      sessions: z.record(
        z.string().uuid().nonempty(),
        z.object({
          jti: z.string().uuid().nonempty(),
          users: z.record(
            z.string().uuid().nonempty(),
            z.object({
              log_in_at: z.date(),
            }),
          ),
        }),
      ).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        sessions: z.record(
          z.string().uuid().nonempty(),
          z.object({
            jti: z.string().uuid().nonempty(),
            users: z.record(
              z.string().uuid().nonempty(),
              z.object({
                log_in_at: z.date(),
              }),
            ),
          }),
        ).optional(),
      })),
      update: z.object({
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        sessions: z.record(
          z.string().uuid().nonempty(),
          z.object({
            jti: z.string().uuid().nonempty(),
            users: z.record(
              z.string().uuid().nonempty(),
              z.object({
                log_in_at: z.date(),
              }),
            ),
          }),
        ).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        sessions: z.record(
          z.string().uuid().nonempty(),
          z.object({
            jti: z.string().uuid().nonempty(),
            users: z.record(
              z.string().uuid().nonempty(),
              z.object({
                log_in_at: z.date(),
              }),
            ),
          }),
        ).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  sessionsV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        device_id: z.string().nonempty(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        device_id: z.string().nonempty(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        device_id: z.string().optional(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
        }),
        session: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          device_id: z.string().optional(),
          status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        device_id: z.string().nonempty(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        device_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        device_id: z.string().optional(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        device_id: z.string().optional(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        device_id: z.string().optional(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        device_id: z.string().optional(),
        status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
        }),
        session: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          device_id: z.string().optional(),
          status: z.enum(["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  emailServicesV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        user_uuid: z.string().uuid().nonempty(),
        device_id: z.string().nonempty(),
        device_uuid: z.string().uuid().nonempty(),
        organization_id: z.string().nonempty(),
        sso_id: z.string().nonempty(),
        sso_uuid: z.string().uuid().nonempty(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_uuid: z.string().uuid().nonempty(),
      device_id: z.string().nonempty(),
      device_uuid: z.string().uuid().nonempty(),
      organization_id: z.string().nonempty(),
      sso_id: z.string().nonempty(),
      sso_uuid: z.string().uuid().nonempty(),
      metadata: z.object({
        secret: z.string().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      }).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        user_uuid: z.string().uuid().nonempty(),
        device_id: z.string().nonempty(),
        device_uuid: z.string().uuid().nonempty(),
        organization_id: z.string().nonempty(),
        sso_id: z.string().nonempty(),
        sso_uuid: z.string().uuid().nonempty(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_uuid: z.string().uuid().nonempty(),
      device_id: z.string().nonempty(),
      device_uuid: z.string().uuid().nonempty(),
      organization_id: z.string().nonempty(),
      sso_id: z.string().nonempty(),
      sso_uuid: z.string().uuid().nonempty(),
      metadata: z.object({
        secret: z.string().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      }).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        user_uuid: z.string().uuid().optional(),
        device_id: z.string().optional(),
        device_uuid: z.string().uuid().optional(),
        organization_id: z.string().optional(),
        sso_id: z.string().optional(),
        sso_uuid: z.string().uuid().optional(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_uuid: z.string().uuid().nonempty(),
      device_id: z.string().nonempty(),
      device_uuid: z.string().uuid().nonempty(),
      organization_id: z.string().nonempty(),
      sso_id: z.string().nonempty(),
      sso_uuid: z.string().uuid().nonempty(),
      metadata: z.object({
        secret: z.string().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      }).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
        }),
        emailService: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          user_uuid: z.string().uuid().optional(),
          device_id: z.string().optional(),
          device_uuid: z.string().uuid().optional(),
          organization_id: z.string().optional(),
          sso_id: z.string().optional(),
          sso_uuid: z.string().uuid().optional(),
          metadata: z.object({
            secret: z.string().nonempty(),
            login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          }).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        user_uuid: z.string().uuid().nonempty(),
        device_id: z.string().nonempty(),
        device_uuid: z.string().uuid().nonempty(),
        organization_id: z.string().nonempty(),
        sso_id: z.string().nonempty(),
        sso_uuid: z.string().uuid().nonempty(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        device_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        device_id: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_uuid: z.string().uuid().nonempty(),
      device_id: z.string().nonempty(),
      device_uuid: z.string().uuid().nonempty(),
      organization_id: z.string().nonempty(),
      sso_id: z.string().nonempty(),
      sso_uuid: z.string().uuid().nonempty(),
      metadata: z.object({
        secret: z.string().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      }).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        user_uuid: z.string().uuid().optional(),
        device_id: z.string().optional(),
        device_uuid: z.string().uuid().optional(),
        organization_id: z.string().optional(),
        sso_id: z.string().optional(),
        sso_uuid: z.string().uuid().optional(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        device_id: z.string().optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        user_uuid: z.string().uuid().optional(),
        device_id: z.string().optional(),
        device_uuid: z.string().uuid().optional(),
        organization_id: z.string().optional(),
        sso_id: z.string().optional(),
        sso_uuid: z.string().uuid().optional(),
        metadata: z.object({
          secret: z.string().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        }).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          sessions: z.record(
            z.string().uuid().nonempty(),
            z.object({
              jti: z.string().uuid().nonempty(),
              users: z.record(
                z.string().uuid().nonempty(),
                z.object({
                  log_in_at: z.date(),
                }),
              ),
            }),
          ).optional(),
        }),
        emailService: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          user_uuid: z.string().uuid().optional(),
          device_id: z.string().optional(),
          device_uuid: z.string().uuid().optional(),
          organization_id: z.string().optional(),
          sso_id: z.string().optional(),
          sso_uuid: z.string().uuid().optional(),
          metadata: z.object({
            secret: z.string().nonempty(),
            login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          }).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  keysV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        secret: z.string().nanoid().optional(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        secret: z.string().nanoid().optional(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        key: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        secret: z.string().nanoid().nonempty(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        expiry: z.number(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          user_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        secret: z.string().nanoid().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
      })),
      update: z.object({
        secret: z.string().nanoid().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        key: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.enum(["ACTIVE", "DEACTIVE", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  organizationsV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        uuid: z.string().uuid().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        uuid: z.string().uuid().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  permissionsV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      permission: z.string().nonempty(),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      permission: z.string().nonempty(),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        permission: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      permission: z.string().nonempty(),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        permission: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          permission: z.string().optional(),
          status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        permission: z.string().nonempty(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          user_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        permission: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      permission: z.string().nonempty(),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        permission: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        permission: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        permission: z.string().optional(),
        status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        permission: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          permission: z.string().optional(),
          status: z.enum(["ACTIVE", "INACTIVE", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  rolesV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      active_permission_ids: z.array(z.string()).nonempty(),
      inactive_permission_ids: z.array(z.string()).nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      active_permission_ids: z.array(z.string()).nonempty(),
      inactive_permission_ids: z.array(z.string()).nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).optional(),
        inactive_permission_ids: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      active_permission_ids: z.array(z.string()).nonempty(),
      inactive_permission_ids: z.array(z.string()).nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        role: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          active_permission_ids: z.array(z.string()).optional(),
          inactive_permission_ids: z.array(z.string()).optional(),
          status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).nonempty(),
        inactive_permission_ids: z.array(z.string()).nonempty(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          user_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).optional(),
        inactive_permission_ids: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      active_permission_ids: z.array(z.string()).nonempty(),
      inactive_permission_ids: z.array(z.string()).nonempty(),
      status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).optional(),
        inactive_permission_ids: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).optional(),
        inactive_permission_ids: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        active_permission_ids: z.array(z.string()).optional(),
        inactive_permission_ids: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        role: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          active_permission_ids: z.array(z.string()).optional(),
          inactive_permission_ids: z.array(z.string()).optional(),
          status: z.enum(["ACTIVE", "DEACTIVED", "DELETED"] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  ssoV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        webhook_url: z.string().url().nonempty(),
        redirect_url: z.string().url().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      webhook_url: z.string().url().nonempty(),
      redirect_url: z.string().url().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum([
        "PREACTIVE",
        "ACTIVE",
        "DEACTIVATED",
        "DELETED",
      ] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        webhook_url: z.string().url().nonempty(),
        redirect_url: z.string().url().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      webhook_url: z.string().url().nonempty(),
      redirect_url: z.string().url().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum([
        "PREACTIVE",
        "ACTIVE",
        "DEACTIVATED",
        "DELETED",
      ] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        webhook_url: z.string().url().optional(),
        redirect_url: z.string().url().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      webhook_url: z.string().url().nonempty(),
      redirect_url: z.string().url().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum([
        "PREACTIVE",
        "ACTIVE",
        "DEACTIVATED",
        "DELETED",
      ] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        sso: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          webhook_url: z.string().url().optional(),
          redirect_url: z.string().url().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum([
            "PREACTIVE",
            "ACTIVE",
            "DEACTIVATED",
            "DELETED",
          ] as const).optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        secret: z.string().nanoid().nonempty(),
        user_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        webhook_url: z.string().url().nonempty(),
        redirect_url: z.string().url().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        user_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().optional(),
          email: z.string().email().nonempty(),
          organization_uuid: z.string().uuid().nonempty(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
          roles: z.array(z.string()).optional(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          user_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        webhook_url: z.string().url().optional(),
        redirect_url: z.string().url().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      secret: z.string().nanoid().nonempty(),
      user_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      webhook_url: z.string().url().nonempty(),
      redirect_url: z.string().url().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum([
        "PREACTIVE",
        "ACTIVE",
        "DEACTIVATED",
        "DELETED",
      ] as const),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        webhook_url: z.string().url().optional(),
        redirect_url: z.string().url().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const).optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        webhook_url: z.string().url().optional(),
        redirect_url: z.string().url().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        secret: z.string().nanoid().optional(),
        user_id: z.string().optional(),
        organization_id: z.string().optional(),
        webhook_url: z.string().url().optional(),
        redirect_url: z.string().url().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum([
          "PREACTIVE",
          "ACTIVE",
          "DEACTIVATED",
          "DELETED",
        ] as const).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        user: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          organization_uuid: z.string().uuid().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
          roles: z.array(z.string()).optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["ACTIVE", "ARCHIVED", "DELETED"] as const).optional(),
        }),
        sso: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          secret: z.string().nanoid().optional(),
          user_id: z.string().optional(),
          organization_id: z.string().optional(),
          webhook_url: z.string().url().optional(),
          redirect_url: z.string().url().optional(),
          login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
          status: z.enum([
            "PREACTIVE",
            "ACTIVE",
            "DEACTIVATED",
            "DELETED",
          ] as const).optional(),
        }),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  usersV1: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        name: z.string().optional(),
        email: z.string().email().nonempty(),
        organization_uuid: z.string().uuid().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        roles: z.array(z.string()).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().optional(),
      email: z.string().email().nonempty(),
      organization_uuid: z.string().uuid().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      roles: z.array(z.string()).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      doc: z.array(z.object({
        name: z.string().optional(),
        email: z.string().email().nonempty(),
        organization_uuid: z.string().uuid().nonempty(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        roles: z.array(z.string()).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().optional(),
      email: z.string().email().nonempty(),
      organization_uuid: z.string().uuid().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      roles: z.array(z.string()).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).or(z.undefined())).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        organization_uuid: z.string().uuid().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        roles: z.array(z.string()).optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().optional(),
      email: z.string().email().nonempty(),
      organization_uuid: z.string().uuid().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      roles: z.array(z.string()).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z
        .object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
        })
        .refine((data) => !Object.values(data).every((value) => !value)),
      update: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        organization_uuid: z.string().uuid().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        roles: z.array(z.string()).optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().optional(),
      email: z.string().email().nonempty(),
      organization_uuid: z.string().uuid().nonempty(),
      login_method: z.enum(["OTP", "MAGIC_LINK"] as const),
      status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const),
      roles: z.array(z.string()).optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        organization_uuid: z.string().uuid().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        roles: z.array(z.string()).optional(),
      })),
      update: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        organization_uuid: z.string().uuid().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        roles: z.array(z.string()).optional(),
      }),
    })).output(z.object({
      acknowledged: z.boolean(),
      modifiedCount: z.number(),
      upsertedCount: z.number(),
      matchedCount: z.number(),
      upsertedId: z.custom<any>(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        organization_uuid: z.string().uuid().optional(),
        login_method: z.enum(["OTP", "MAGIC_LINK"] as const).optional(),
        status: z.enum(["ACTIVE", "BLOCKED", "DELETED"] as const).optional(),
        roles: z.array(z.string()).optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      deletedCount: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

