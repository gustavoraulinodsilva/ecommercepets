import { Breed } from 'src/breed/entities/breed.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breedadoption {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    url: string;
    
    @Column({ nullable: false })
    alt: string;
    
    @Column({ nullable: false })
    order: number;
    
    @ManyToOne(() => Breed, (breed) => breed.breedadoption, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    breed: Breed;
}
