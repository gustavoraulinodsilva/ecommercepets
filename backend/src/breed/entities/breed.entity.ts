import { Breedcarousel } from "src/breedcarousel/entities/breedcarousel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Breedcarousel, {eager: true, nullable: false})
    Breedcarousel: Breedcarousel[];
}
