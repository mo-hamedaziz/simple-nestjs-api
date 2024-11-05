/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity  } from "typeorm";

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ default: false })
    isCompleted: boolean;
}