import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    url: string;

    @Column({nullable: false})
    alt: string;

    @Column({nullable: false})
    tag: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    content: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
