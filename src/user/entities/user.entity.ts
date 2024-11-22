/* eslint-disable prettier/prettier */
import { Cv } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string

    @Column()
    password: string;

    @OneToMany(() => Cv, (cv) => cv.user)
    cvs: Cv[];
}
