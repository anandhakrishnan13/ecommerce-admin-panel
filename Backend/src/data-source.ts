import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // Accept Render's self-signed cert
  },
  entities: [User, Product],
});
