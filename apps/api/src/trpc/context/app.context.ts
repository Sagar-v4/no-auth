import { Injectable } from "@nestjs/common";
import { ContextOptions, TRPCContext } from "nestjs-trpc";

@Injectable()
export class AppContext implements TRPCContext {
  async create(opts: ContextOptions) {
    return {
      req: opts.req,
      res: opts.res,
    };
  }
}
