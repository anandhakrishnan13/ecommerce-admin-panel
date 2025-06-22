import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
  
  static getAll = async (req: any, res: Response) => {
  const userId = req.user.id; // from authMiddleware
  const products = await ProductService.getAll(userId);
  res.json(products);
};


  static getOne = async (req: any, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await ProductService.getOne(id);
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Only allow if the product belongs to logged-in user
  if (product.user.id !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(product);
};


  static create = async (req: any, res: Response) => {
  const userId = req.user.id;
  const product = await ProductService.create(req.body, userId);
  res.status(201).json(product);
};


  static update = async (req: any, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await ProductService.getOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user.id !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  const updated = await ProductService.update(id, req.body);
  res.json(updated);
};


  static delete = async (req: any, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await ProductService.getOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user.id !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  await ProductService.delete(id);
  res.sendStatus(204);
};

}
