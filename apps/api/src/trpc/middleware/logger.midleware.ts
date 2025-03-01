import { Injectable, Logger } from "@nestjs/common";
import { MiddlewareOptions, TRPCMiddleware } from "nestjs-trpc";
import { IAppContextExpress } from "@/trpc/context/context.interface";

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions<any>) {
    const start = Date.now();
    const { next, path, type } = opts;
    const result = await next();

    const { req, res } = opts.ctx;
    const meta = {
      path,
      type,
      durationMs: Date.now() - start,
      method: req.method,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
    };

    result.ok
      ? this.logger.log("Success", meta)
      : this.logger.error("Error", meta);

    return result;
  }
}
