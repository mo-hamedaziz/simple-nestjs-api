import { Body, Controller, Delete, Get, Param, Post, Query} from "@nestjs/common";
import { ToDoService } from "./ToDo.service";
import { AddToDodto } from "./dto/AddToDo.dto";
import { ToDo } from "./ToDo.entity";
import { UpdateAddToDodto } from "./dto/UpdateToDo.dto";
import { Status } from "./status.enum";


@Controller('ToDo')
export class TodoController{
    constructor(private readonly ToDoService:ToDoService) {}
    @Post('addToDo')
    AddTodo(@Body() ToDo:AddToDodto) {
        return  this.ToDoService.AddToDo(ToDo);
    }
    @Get('nomber')
    async nomber()
    {
        console.log(this.ToDoService.CountActive())
        const result= {
            "active": await this.ToDoService.CountActive(),
            "Inactive":  await this.ToDoService.CountInactive(),
            "Banned": await this.ToDoService.CountBanned()
        }
        
        return result
    }

    @Delete('/del/:id')
    DeleteToDo(@Param('id') id:number)
    {
        return this.ToDoService.DeleteToDo(id)
    }

    @Get('active')
    Getactive(){
        return this.ToDoService.CountActive()
    }

    @Get('inactive')
    GetInactive(){
        return this.ToDoService.CountInactive()
    }

    @Get('banned')
    GetBanned()
    {
        return this.ToDoService.CountBanned()
    }

    @Get('recover/:id')
    Recover(@Param('id') id:number ) {
        return this.ToDoService.RecoverToDo(id)
    }
    @Get()
    GetAll(@Query('Description') Description?: string, @Query('status') status?: Status) {
        return this.ToDoService.getUser(Description, status);
    }

    @Post("status/:id")
    updatestatus(@Body() UpdatedToDo:UpdateAddToDodto,@Param('id') id:number)
    {
        return this.ToDoService.Updatestatus(id,UpdatedToDo.status)
    }

    @Get('user/:id')
    getUser(@Param('id') id:number) {
        return this.ToDoService.GetToDo(id)
    }


    @Get('paginated')
    getpage(@Query('offset') offset:number,@Query('limit') limit:number) {
        return this.ToDoService.PaginatedGet(offset,limit)
    }



}