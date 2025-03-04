import { FastifyRequest, FastifyReply } from "fastify";

export interface IAppContext {
  req: FastifyRequest;
  res: FastifyReply;
}
