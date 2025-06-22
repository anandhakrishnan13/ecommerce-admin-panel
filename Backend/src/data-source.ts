import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "ecommerce_db",
  synchronize: true,
  logging: false,
  entities: [User,Product],
});
