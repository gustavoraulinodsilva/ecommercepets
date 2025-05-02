import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breedcarousel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    url: string;

    @Column({nullable: false})
    alt: string;

    @Column()
    order: number;
}
