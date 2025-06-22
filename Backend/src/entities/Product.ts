import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column("simple-array", { default: "" })
  images: string[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
