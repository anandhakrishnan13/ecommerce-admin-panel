import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized - No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.user = decoded as JwtPayload & { id: number };
      next();
    } else {
      res.status(401).json({ message: "Unauthorized - Invalid token structure" });
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
