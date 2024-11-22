/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsOptional, IsNumber, IsArray } from 'class-validator';

export class UpdateCvDto extends PartialType(CreateCvDto) {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skills?: number[];
}
