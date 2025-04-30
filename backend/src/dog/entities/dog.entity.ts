import { Breed } from "src/breed/entities/breed.entity";
import { Dogcolor } from "src/dogcolors/entities/dogcolor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    sku: string;

    @ManyToOne(() => Breed, {eager: true, nullable: false})
    breed: Breed;

    @Column({nullable: false})
    price: string;

    @Column({type: 'enum', enum: ['Male', 'Female'], nullable: false})
    gender: 'Male' | 'Female';

    @Column({nullable: false})
    age: string;

    @Column({nullable: false})
    size: string;

    @ManyToOne(() => Dogcolor, {eager: true, nullable: false})
    color: Dogcolor;

    @Column({default: false})
    vaccinated: boolean;

    @Column({default: false})
    dewormed: boolean;

    @Column({default: false})
    certified: boolean;

    @Column({default: false})
    microship : boolean;

    @Column({nullable: false})
    localization: string;

    @Column({nullable: false})
    publicationDate: Date;

    @Column({nullable: false})
    description: string;
}
