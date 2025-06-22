import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
  static async signup(username: string, password: string) {
    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({ username, password: hashedPassword });
    return await userRepo.save(newUser);
  }

  static async login(username: string, password: string) {
    const user = await userRepo.findOneBy({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
}
