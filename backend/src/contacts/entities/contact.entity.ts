import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'enum', enum: ['Product', 'Pet'], nullable: false})
    type: 'Product' | 'Pet';

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    phone: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    state: string;

    @Column({nullable: false})
    route_uuid: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}