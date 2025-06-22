import fs from 'fs';
import path from 'path';
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

const repo = AppDataSource.getRepository(Product);
const userRepo = AppDataSource.getRepository(User);

export class ProductService {
  // Get all products for a specific user
  static async getAll(userId: number) {
    return repo.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  // Get one product (also used for checking user ownership)
  static async getOne(id: number) {
    return repo.findOne({
      where: { id },
      relations: ['user']
    });
  }

  // Create product for a user
  static async create(data: Product, userId: number) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const product = repo.create({ ...data, user });
    return repo.save(product);
  }

  // Update product
  static async update(id: number, data: Partial<Product>) {
    await repo.update(id, data);
    return repo.findOne({
      where: { id },
      relations: ['user']
    });
  }

  // Delete product and images
  static async delete(id: number) {
    const product = await repo.findOne({
      where: { id },
      relations: ['user']
    });

    if (product && product.images?.length > 0) {
      product.images.forEach((imgUrl) => {
        const filename = imgUrl.split('/').pop();
        const filepath = path.join(__dirname, '..', '..', 'uploads', filename!);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      });
    }

    return repo.delete(id);
  }
}
