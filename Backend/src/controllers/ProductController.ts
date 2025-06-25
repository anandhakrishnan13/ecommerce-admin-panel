import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
  static getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const products = await ProductService.getAll(userId);
    res.json(products);
  };

  static getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const product = await ProductService.getOne(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (product.user.id !== req.user!.id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    res.json(product);
  };

  static create = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const product = await ProductService.create(req.body, userId);
    res.status(201).json(product);
  };

  static update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const product = await ProductService.getOne(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (product.user.id !== req.user!.id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const updated = await ProductService.update(id, req.body);
    res.json(updated);
  };

  static delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const product = await ProductService.getOne(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (product.user.id !== req.user!.id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    await ProductService.delete(id);
    res.sendStatus(204);
  };
}
