import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/ProductController";
import { upload } from "../utils/upload";
import { authMiddleware } from "../middleware/authMiddleware";
import fs from "fs";
import path from "path";
import { environment } from 'src/environments/environment';

// import { AuthenticatedRequest } from "../middleware/authMiddleware"; // For `req.user`

const router = Router();

// Product Routes
router.get("/:id", authMiddleware, ProductController.getOne);
router.get("/", authMiddleware, ProductController.getAll);
router.post("/", authMiddleware, ProductController.create);
router.put("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

// Image Upload Route
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  (req: Request, res: Response): void => {
    const file = req.file as Express.Multer.File;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    res.json({ imageUrl: `${environment.apiUrl}/uploads/${file.filename}` });
  }
);

// Image Delete Route
router.delete(
  "/delete-image/:filename",
  authMiddleware,
  (req: Request, res: Response): void => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "..", "..", "uploads", filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
        res.status(500).json({ message: "Failed to delete image" });
        return;
      }
      res.status(200).json({ message: "Image deleted successfully" });
    });
  }
);

export default router;
