import { NextFunction, Request, Response } from "express";
import { jwtUtil } from "../utils/jwt";

/**
 * Auth middleware which authenticate bam token from header
 *
 * @param req express request callback
 * @param res express response callback
 * @param next express next callback
 * @returns calls next function if token is valid
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  if (jwtUtil.verifyToken(token)) {
    next();
  } else {
    res.sendStatus(401);
  }
}
