import { FastifyReply, FastifyRequest } from "fastify";

export interface IAppContext {
  req: FastifyRequest;
  res: FastifyReply;
}
