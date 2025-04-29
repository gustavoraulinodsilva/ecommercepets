import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    code: string;

    @Column({nullable: false})
    breed: string;

    @Column({nullable: false})
    price: string;

    @Column({nullable: false})
    gender: string;

    @Column({nullable: false})
    age: string;

    @Column({nullable: false})
    size: string;

    @Column({nullable: false})
    color: string;

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
