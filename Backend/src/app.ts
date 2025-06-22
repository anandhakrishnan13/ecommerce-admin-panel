import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import productRoutes from "./routes/product.routes";
import path from 'path';
import authRoutes from "./routes/auth.routes";


const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Database connected");
  app.use("/products", productRoutes);
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use("/auth", authRoutes);


  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });

}).catch((error) => console.log(error));
