/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";



export class AddToDodto {
    userId: string;

    @IsNotEmpty()
    @MinLength(3,{message:'Name must be atleast 3'})
    @MaxLength(10,{message:'Length of name should not pass 10'})
    name:string

    @IsNotEmpty()
    @MinLength(10,{message:'Descption should be atlleast 10'})
    Description:string

}