import { IsEnum, IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";
import { Status } from "../status.enum";
import {PartialType} from "@nestjs/mapped-types";
import { AddToDodto } from "./AddToDo.dto";


export class UpdateAddToDodto  extends PartialType(AddToDodto) {
    @IsEnum(Status,{message:'Status is either active or inactive or banned'})
    status:Status;

}