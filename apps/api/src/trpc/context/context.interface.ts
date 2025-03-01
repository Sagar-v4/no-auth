import { Request, Response } from "express";

export interface IAppContextExpress {
  req: Request;
  res: Response;
}
