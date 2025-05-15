import { Productcarousel } from "src/productcarousel/entities/productcarousel.entity";
import { Productcategory } from "src/productcategory/entities/productcategory.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    sku: string;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Productcategory, category => category.products, {eager: true, nullable: false})
    category: Productcategory;

    @Column({nullable: false})
    price: string;

    @Column({default: false})
    stock: boolean;

    @Column({nullable: false})
    size: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(() => Productcarousel, (productCarousel) => productCarousel.product)
    productCarousels: Productcarousel[];
}
