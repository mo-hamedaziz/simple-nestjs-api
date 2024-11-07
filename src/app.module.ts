import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './Common/CommonModule';
import { ToDoModule } from './to-do/to-do.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CommonModule, ToDoModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3306,
    username:'nest_user',
    password:'nest_pass',
    database:'tp_nest',
    synchronize:true,
    autoLoadEntities:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
