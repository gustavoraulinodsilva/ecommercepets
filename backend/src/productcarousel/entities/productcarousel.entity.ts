import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Productcarousel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    url: string;

    @Column({nullable: false})
    alt: string;

    @Column()
    order: number;

    @ManyToOne(() => Product, (product) => product.productCarousels, { nullable: false, onDelete: 'CASCADE' })
    product: Product;
}
