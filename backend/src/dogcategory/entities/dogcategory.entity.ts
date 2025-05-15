import { Dog } from "src/dog/entities/dog.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dogcategory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @OneToMany(() => Dog, dog => dog.category)
    dogs: Dog[];
}
