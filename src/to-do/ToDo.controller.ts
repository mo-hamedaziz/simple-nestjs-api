/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ToDoService } from './ToDo.service';
import { AddToDodto } from './dto/AddToDo.dto';
import { UpdateAddToDodto } from './dto/UpdateToDo.dto';
import { Status } from './status.enum';
import { Request } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly ToDoService: ToDoService) {}

  @Post('addToDo')
  async AddTodo(@Body() ToDo: AddToDodto, @Req() req: Request) {
    try {
      const userId = req['userId'];

      return await this.ToDoService.AddToDo(ToDo, userId);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  @Get('number')
  async number() {
    console.log(this.ToDoService.CountActive());
    const result = {
      active: await this.ToDoService.CountActive(),
      Inactive: await this.ToDoService.CountInactive(),
      Banned: await this.ToDoService.CountBanned(),
    };

    return result;
  }

  @Delete('/del/:id')
  async DeleteToDo(@Param('id') id: number, @Req() req: Request) {
    const userId = req['userId'];
    const todo = await this.ToDoService.GetToDo(id);
    if (todo.userId !== userId) {
      throw new ForbiddenException('Forbidden: You cannot delete this Todo!');
    }

    return this.ToDoService.DeleteToDo(id);
  }

  @Patch('update/:id')
  async UpdateToDo(
    @Param('id') id: number,
    @Body() UpdatedToDo: UpdateAddToDodto,
    @Req() req: Request,
  ) {
    const userId = req['userId'];
    const todo = await this.ToDoService.GetToDo(id);
    if (todo.userId !== userId) {
      throw new ForbiddenException('You cannot update this Todo');
    }
    return this.ToDoService.UpdateToDo(
      id,
      UpdatedToDo.name,
      UpdatedToDo.Description,
    );
  }

  @Get('active')
  Getactive() {
    return this.ToDoService.CountActive();
  }

  @Get('inactive')
  GetInactive() {
    return this.ToDoService.CountInactive();
  }

  @Get('banned')
  GetBanned() {
    return this.ToDoService.CountBanned();
  }

  @Get('recover/:id')
  Recover(@Param('id') id: number) {
    return this.ToDoService.RecoverToDo(id);
  }
  @Get()
  GetAll(
    @Query('Description') Description?: string,
    @Query('status') status?: Status,
  ) {
    return this.ToDoService.getUser(Description, status);
  }

  @Post('status/:id')
  updatestatus(@Body() UpdatedToDo: UpdateAddToDodto, @Param('id') id: number) {
    return this.ToDoService.Updatestatus(id, UpdatedToDo.status);
  }

  @Get('user/:id')
  getUser(@Param('id') id: number) {
    return this.ToDoService.GetToDo(id);
  }

  @Get('paginated')
  getpage(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.ToDoService.PaginatedGet(offset, limit);
  }
}
