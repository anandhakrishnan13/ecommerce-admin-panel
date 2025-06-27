import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./data-source";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// Connect to DB and start server
AppDataSource.initialize().then(() => {
  console.log("✅ Database connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((error) => console.error("❌ DB connection failed:", error));
