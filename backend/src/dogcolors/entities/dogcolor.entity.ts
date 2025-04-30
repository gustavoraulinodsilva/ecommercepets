import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class Dogcolor {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    color: string;
}
