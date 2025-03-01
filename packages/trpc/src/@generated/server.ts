import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  clients: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().nonempty(),
      email: z.string().email().nonempty(),
      login_method: z.string().nonempty(),
      status: z.string().nonempty(),
      roles: z.record(z.string().nonempty(), z.number()),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().nonempty(),
      email: z.string().email().nonempty(),
      login_method: z.string().nonempty(),
      status: z.string().nonempty(),
      roles: z.record(z.string().nonempty(), z.number()),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        login_method: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().nonempty(),
      email: z.string().email().nonempty(),
      login_method: z.string().nonempty(),
      status: z.string().nonempty(),
      roles: z.record(z.string().nonempty(), z.number()),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        login_method: z.string().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      name: z.string().nonempty(),
      email: z.string().email().nonempty(),
      login_method: z.string().nonempty(),
      status: z.string().nonempty(),
      roles: z.record(z.string().nonempty(), z.number()),
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
        login_method: z.string().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        login_method: z.string().optional(),
        status: z.string().optional(),
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
        login_method: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  clienteles: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        organization_id: z.string().nonempty(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      organization_id: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        organization_id: z.string().nonempty(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      organization_id: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        organization_id: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      organization_id: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        clientele: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          organization_id: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        organization_id: z.string().optional(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(
        z.object({
          organization_id: z.object({
            _id: z.custom<any>(),
            uuid: z.string().uuid().nonempty(),
            client_id: z.string().nonempty(),
            name: z.string().nonempty(),
            description: z.string().optional(),
            status: z.string().nonempty(),
            metadata: z.object({}).optional(),
            createdAt: z.date(),
            updatedAt: z.date(),
          })
        }),
      ),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      organization_id: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        organization_id: z.string().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        status: z.string().optional(),
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
        organization_id: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        clientele: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          organization_id: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  organizations: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        client_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        client_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        client_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        client_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        client_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().nonempty(),
          email: z.string().email().nonempty(),
          login_method: z.string().nonempty(),
          status: z.string().nonempty(),
          roles: z.record(z.string().nonempty(), z.number()),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        client_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        client_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
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
        client_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  emailApps: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      type: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        client_id: z.string().nonempty(),
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
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      type: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      type: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        email_app: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          type: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        type: z.string().nonempty(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        client_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().nonempty(),
          email: z.string().email().nonempty(),
          login_method: z.string().nonempty(),
          status: z.string().nonempty(),
          roles: z.record(z.string().nonempty(), z.number()),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          client_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.string().nonempty(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      type: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
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
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        email_app: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          type: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  forms: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        email_app_id: z.string().nonempty(),
        title: z.string().nonempty(),
        short_description: z.string().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      email_app_id: z.string().nonempty(),
      title: z.string().nonempty(),
      short_description: z.string().optional(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        email_app_id: z.string().nonempty(),
        title: z.string().nonempty(),
        short_description: z.string().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      email_app_id: z.string().nonempty(),
      title: z.string().nonempty(),
      short_description: z.string().optional(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        email_app_id: z.string().optional(),
        title: z.string().optional(),
        short_description: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      email_app_id: z.string().nonempty(),
      title: z.string().nonempty(),
      short_description: z.string().optional(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        email_app: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          type: z.string().optional(),
          status: z.string().optional(),
        }),
        form: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          email_app_id: z.string().optional(),
          title: z.string().optional(),
          short_description: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        email_app_id: z.string().nonempty(),
        title: z.string().nonempty(),
        short_description: z.string().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        expiry: z.number(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        client_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().nonempty(),
          email: z.string().email().nonempty(),
          login_method: z.string().nonempty(),
          status: z.string().nonempty(),
          roles: z.record(z.string().nonempty(), z.number()),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          client_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.string().nonempty(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        email_app_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          client_id: z.string().nonempty(),
          organization_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          type: z.string().nonempty(),
          status: z.string().nonempty(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        email_app_id: z.string().optional(),
        title: z.string().optional(),
        short_description: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      email_app_id: z.string().nonempty(),
      title: z.string().nonempty(),
      short_description: z.string().optional(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        email_app_id: z.string().optional(),
        title: z.string().optional(),
        short_description: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        email_app_id: z.string().optional(),
        title: z.string().optional(),
        short_description: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
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
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        email_app_id: z.string().optional(),
        title: z.string().optional(),
        short_description: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        email_app: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          type: z.string().optional(),
          status: z.string().optional(),
        }),
        form: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          email_app_id: z.string().optional(),
          title: z.string().optional(),
          short_description: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  keys: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        client_id: z.string().nonempty(),
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
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        key: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        client_id: z.string().nonempty(),
        organization_id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        expiry: z.number(),
        status: z.string().optional(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(z.object({
        client_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          name: z.string().nonempty(),
          email: z.string().email().nonempty(),
          login_method: z.string().nonempty(),
          status: z.string().nonempty(),
          roles: z.record(z.string().nonempty(), z.number()),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })).merge(z.object({
        organization_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          client_id: z.string().nonempty(),
          name: z.string().nonempty(),
          description: z.string().optional(),
          status: z.string().nonempty(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      client_id: z.string().nonempty(),
      organization_id: z.string().nonempty(),
      name: z.string().nonempty(),
      description: z.string().optional(),
      expiry: z.number(),
      status: z.string().optional(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
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
        client_id: z.string().optional(),
        organization_id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        expiry: z.number().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        client: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          name: z.string().optional(),
          email: z.string().email().optional(),
          login_method: z.string().optional(),
          status: z.string().optional(),
        }),
        organization: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        }),
        key: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          client_id: z.string().optional(),
          organization_id: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          expiry: z.number().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  devices: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({}),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({})),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        status: z.string().optional(),
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
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  sessions: t.router({
    insertOne: publicProcedure.input(z.object({
      doc: z.object({
        user_id: z.string().nonempty(),
        user_type: z.string().nonempty(),
        device_id: z.string().nonempty(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_type: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    insertMany: publicProcedure.input(z.object({
      docs: z.array(z.object({
        user_id: z.string().nonempty(),
        user_type: z.string().nonempty(),
        device_id: z.string().nonempty(),
      })),
    })).output(z.object({
      acknowledged: z.boolean(),
      insertedCount: z.number(),
      insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_type: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        user_type: z.string().optional(),
        device_id: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.array(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_type: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findByRef: publicProcedure.input(z.object({
      filter: z.object({
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.string().optional(),
        }),
        session: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          user_type: z.string().optional(),
          device_id: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.array(
      z.object({
        _id: z.custom<any>(),
        uuid: z.string().uuid().nonempty(),
        user_id: z.string().nonempty(),
        user_type: z.string().nonempty(),
        device_id: z.string().nonempty(),
        status: z.string().nonempty(),
        metadata: z.object({}).optional(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).merge(
        z.object({
          user_id: z.union([z.object({
            _id: z.custom<any>(),
            uuid: z.string().uuid().nonempty(),
            name: z.string().nonempty(),
            email: z.string().email().nonempty(),
            login_method: z.string().nonempty(),
            status: z.string().nonempty(),
            roles: z.record(z.string().nonempty(), z.number()),
            metadata: z.object({}).optional(),
            createdAt: z.date(),
            updatedAt: z.date(),
          }), z.object({
            _id: z.custom<any>(),
            uuid: z.string().uuid().nonempty(),
            organization_id: z.string().optional(),
            status: z.string().nonempty(),
            metadata: z.object({}).optional(),
            createdAt: z.date(),
            updatedAt: z.date(),
          })]),
        }),
      ).merge(z.object({
        device_id: z.object({
          _id: z.custom<any>(),
          uuid: z.string().uuid().nonempty(),
          status: z.string().nonempty(),
          metadata: z.object({}).optional(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      })),
    )).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateById: publicProcedure.input(z.object({
      filter: z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
      }),
      update: z.object({
        user_id: z.string().optional(),
        user_type: z.string().optional(),
        device_id: z.string().optional(),
        status: z.string().optional(),
      }),
    })).output(z.object({
      _id: z.custom<any>(),
      uuid: z.string().uuid().nonempty(),
      user_id: z.string().nonempty(),
      user_type: z.string().nonempty(),
      device_id: z.string().nonempty(),
      status: z.string().nonempty(),
      metadata: z.object({}).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateByData: publicProcedure.input(z.object({
      filter: z.array(z.object({
        _id: z.string().optional(),
        uuid: z.string().uuid().optional(),
        user_id: z.string().optional(),
        user_type: z.string().optional(),
        device_id: z.string().optional(),
        status: z.string().optional(),
      })),
      update: z.object({
        user_id: z.string().optional(),
        user_type: z.string().optional(),
        device_id: z.string().optional(),
        status: z.string().optional(),
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
        user_type: z.string().optional(),
        device_id: z.string().optional(),
        status: z.string().optional(),
      })),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteByRef: publicProcedure.input(z.object({
      filter: z.object({
        device: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          status: z.string().optional(),
        }),
        session: z.object({
          _id: z.string().optional(),
          uuid: z.string().uuid().optional(),
          user_id: z.string().optional(),
          user_type: z.string().optional(),
          device_id: z.string().optional(),
          status: z.string().optional(),
        }),
      }),
    })).output(z.object({
      delete_count: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

