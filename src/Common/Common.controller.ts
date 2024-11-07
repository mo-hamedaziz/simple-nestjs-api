import { Controller, Get } from "@nestjs/common";
import { CommonService } from "./Common.service";




@Controller('common')

export class CommonController{
    constructor(private readonly Commonservice:CommonService) {}


    @Get()
    getuuid():string {
        return this.Commonservice.GetUUID();

    }


}