import { Breedcarousel } from "src/breedcarousel/entities/breedcarousel.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column({nullable: false})
    name: string;

    @OneToMany(() => Breedcarousel, (carousel) => carousel.breed, { cascade: true })
    breedcarousel: Breedcarousel[];
}
