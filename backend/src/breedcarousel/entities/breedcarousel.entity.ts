import { UUID } from "crypto";
import { Breed } from "src/breed/entities/breed.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Breed, (breed) => breed.breedcarousel, { nullable: false, onDelete: 'CASCADE' })
    breed: Breed;
}
