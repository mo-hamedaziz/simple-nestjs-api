import { Module } from '@nestjs/common';
import { ToDoService } from './ToDo.service';
import { TodoController } from './ToDo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './ToDo.entity';

@Module({
    imports:[TypeOrmModule.forFeature([ToDo])],
    exports:[],
    controllers:[TodoController],
    providers:[ToDoService],

})
export class ToDoModule {}
