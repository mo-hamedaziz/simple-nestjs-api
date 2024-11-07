import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "./status.enum";



@Entity('ToDo')
export class ToDo {
    @PrimaryGeneratedColumn()
    Id:number

    @Column({nullable:false,length:10})
    name:string

    @Column({length:250,nullable:false})
    Description:string

    @CreateDateColumn({update:false})
    Date:Date 

    @Column({
        type:"enum",
        enum:Status,
        default:Status.inactive

    })
    Status:Status

    @UpdateDateColumn()
    UpdatedDate:Date

    @DeleteDateColumn()
    DeletedDate:Date
}