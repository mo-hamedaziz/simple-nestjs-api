import { Injectable, NotFoundException, Post, Search } from "@nestjs/common";
import { QueryBuilder, Repository } from "typeorm";
import { ToDo } from "./ToDo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddToDodto } from "./dto/AddToDo.dto";
import { Status } from "./status.enum";
import { UpdateAddToDodto } from "./dto/UpdateToDo.dto";
import { todo } from "node:test";
import { stat } from "fs";




@Injectable()
export class ToDoService {

    constructor(@InjectRepository(ToDo) private readonly ToDorepository:Repository<ToDo>) {}


    async AddToDo(ToDo:AddToDodto):Promise<ToDo>{
        const ToDO=this.ToDorepository.create({
            name:ToDo.name,
            Description:ToDo.Description
        })
        return await this.ToDorepository.save(ToDO)
    }

    async UpdateToDo(id,name,des) {
        return await this.ToDorepository.preload({Id:id,name:name,Description:des})
    }

    async DeleteToDo(id:number) {
        return await this.ToDorepository.softDelete(id)
    }
    async RecoverToDo(id:number) {
        const ToDo= await this.ToDorepository.findOne({where : {Id:id}, withDeleted:true})
        if (!ToDo) {
            throw new NotFoundException(`ToDo with ID ${id} not found`);
          }
        return await this.ToDorepository.recover(ToDo)
    }


    async CountActive(){
        return await this.ToDorepository.count({where : {Status:Status.active}})
    }
    async CountInactive(){
        return await this.ToDorepository.count({where:{Status:Status.inactive}})
    }
    async CountBanned(){
        return await this.ToDorepository.count({where:{Status:Status.banned}})
    }
    async Findall() {
        return await this.ToDorepository.find()
    }
    async Updatestatus(id:number,new_status:Status) {
        const ToDo= await this.ToDorepository.findOne({where :{Id:id}})
        ToDo.Status=new_status
        return await this.ToDorepository.save(ToDo)
    }

    async GetToDo(id:number) {
        const Todo=this.ToDorepository.findOne({where : {Id:id}})
        if (!Todo) {
            throw new NotFoundException('No user with id ${id} found')
        }
        return Todo
    }

    async getUser(Descption?:string,status?:Status){
        const query= this.ToDorepository.createQueryBuilder('todo');
        if (status) {
            query.andWhere('todo.status = :status',{status})
        }
        if (Descption) {
            query.orWhere('todo.Descrp  tion = :Descption',{Descption})
        }
        return query.getRawMany()    }
    async PaginatedGet(offset:number,limit:number){
        const queryBuilder=this.ToDorepository.createQueryBuilder("ToDo").select("*").take(limit).skip(offset).getRawMany()
        return queryBuilder

    }
}