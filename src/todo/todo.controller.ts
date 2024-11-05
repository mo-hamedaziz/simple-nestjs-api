/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post()
    createTodo(@Body() body: CreateTodoDto) {
        return this.todoService.create(body);
    }

    @Get()
    findTodos() {
        return this.todoService.find();
    }

    @Get('/:id')
    findTodoById(@Param('id') id:string) {
        return this.todoService.findOne(+id);
    }

    @Patch('/:id')
    updateTodoStatus(@Param('id') id:string) {
        return this.todoService.update(+id);
    }
}
