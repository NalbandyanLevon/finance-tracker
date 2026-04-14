import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthRequestBody {
  email: string;
  password: string;
}

export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: JwtUserPayload;
}

export interface JwtUserPayload extends JwtPayload {
  userId: string;
}
