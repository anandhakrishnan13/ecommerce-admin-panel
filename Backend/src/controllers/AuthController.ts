import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import jwt from "jsonwebtoken"; // for token generation

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // fallback key if env not set

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.signup(username, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.login(username, password);

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({
        message: "Login successful",
        token,
      });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  }
}
