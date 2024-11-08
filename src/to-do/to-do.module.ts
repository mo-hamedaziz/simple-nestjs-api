import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ToDoService } from './ToDo.service';
import { TodoController } from './ToDo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './ToDo.entity';
// import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  exports: [],
  controllers: [TodoController],
  providers: [ToDoService],
})
export class ToDoModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(TodoController);
//   }
}
