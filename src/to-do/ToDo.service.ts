/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ToDo } from './ToDo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToDodto } from './dto/AddToDo.dto';
import { Status } from './status.enum';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo) private readonly ToDorepository: Repository<ToDo>,
  ) {}

  async AddToDo(ToDo: AddToDodto, userId: string): Promise<ToDo> {
    
    const ToDO = this.ToDorepository.create({
      name: ToDo.name,
      Description: ToDo.Description,
      userId,
    });

    return await this.ToDorepository.save(ToDO);
  }

  async UpdateToDo(id: number, name: string, Description: string) {
    const todo = await this.ToDorepository.preload({
      Id: id,
      name,
      Description,
    });
    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }

    return this.ToDorepository.save(todo);
  }

  async DeleteToDo(id: number) {
    const todo = await this.ToDorepository.findOne({ where: { Id: id } });
    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }

    return await this.ToDorepository.softDelete(id);
  }

  async RecoverToDo(id: number) {
    const ToDo = await this.ToDorepository.findOne({
      where: { Id: id },
      withDeleted: true,
    });
    if (!ToDo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    return await this.ToDorepository.recover(ToDo);
  }

  async CountActive() {
    return await this.ToDorepository.count({
      where: { Status: Status.active },
    });
  }
  async CountInactive() {
    return await this.ToDorepository.count({
      where: { Status: Status.inactive },
    });
  }
  async CountBanned() {
    return await this.ToDorepository.count({
      where: { Status: Status.banned },
    });
  }
  async Findall() {
    return await this.ToDorepository.find();
  }
  async Updatestatus(id: number, new_status: Status) {
    const ToDo = await this.ToDorepository.findOne({ where: { Id: id } });
    ToDo.Status = new_status;
    return await this.ToDorepository.save(ToDo);
  }

  async GetToDo(id: number): Promise<ToDo> {
    const todo = await this.ToDorepository.findOne({ where: { Id: id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async getUser(Descption?: string, status?: Status) {
    const query = this.ToDorepository.createQueryBuilder('todo');
    if (status) {
      query.andWhere('todo.status = :status', { status });
    }
    if (Descption) {
      query.orWhere('todo.Descrp  tion = :Descption', { Descption });
    }
    return query.getRawMany();
  }
  async PaginatedGet(offset: number, limit: number) {
    const queryBuilder = this.ToDorepository.createQueryBuilder('ToDo')
      .select('*')
      .take(limit)
      .skip(offset)
      .getRawMany();
    return queryBuilder;
  }
}
