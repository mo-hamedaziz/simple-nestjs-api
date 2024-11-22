/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateCvDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  Cin: string;

  @IsNotEmpty()
  @IsString()
  Job: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skills?: number[];
}
