import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { upload } from '../utils/upload';
import { authMiddleware } from "../middleware/authMiddleware";
import fs from 'fs';
import path from 'path';

const router = Router();

router.get("/:id", authMiddleware, ProductController.getOne);
router.get("/", authMiddleware, ProductController.getAll);
router.post("/", authMiddleware, ProductController.create);
router.put("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  res.json({ imageUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

router.delete('/delete-image/:filename', authMiddleware, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  });
});

export default router;
