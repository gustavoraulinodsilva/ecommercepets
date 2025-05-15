import { Breed } from "src/breed/entities/breed.entity";
import { Dogcategory } from "src/dogcategory/entities/dogcategory.entity";
import { Dogcolor } from "src/dogcolors/entities/dogcolor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dog {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToOne(() => Dogcategory, category => category.dogs)
    @JoinColumn({ name: 'category_id' })
    category: Dogcategory;

    @ManyToMany(() => Dogcolor, {eager: true})
    @JoinTable({
        name: "dog_colors",
        joinColumn: {
            name: "dog_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "color_id",
            referencedColumnName: "id"
        }
    })
    colors: Dogcolor[];

    @Column({default: false})
    vaccinated: boolean;

    @Column({default: false})
    dewormed: boolean;

    @Column({default: false})
    certified: boolean;

    @Column({default: false})
    microship: boolean;

    @Column({nullable: false})
    localization: string;

    @Column({nullable: false})
    publicationDate: Date;

    @Column({nullable: false})
    description: string;
}
