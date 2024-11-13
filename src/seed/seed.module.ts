import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cv } from 'src/cv/entities/cv.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cv, Skill])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
