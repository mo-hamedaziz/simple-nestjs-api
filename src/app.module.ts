/* eslint-disable prettier/prettier */
// import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './Common/CommonModule';
import { ToDoModule } from './to-do/to-do.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
// import { SeedModule } from './seed/seed.module';
// import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true, // For .env files to be accessibles globally
    }),
    ToDoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest_user',
      password: 'nest_pass',
      database: 'tp_nest',
      synchronize: true,
      autoLoadEntities: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
    // SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo'); 
  }
}


// export class AppModule implements OnModuleInit {
//   constructor(private readonly seedService: SeedService) {}
  
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('todo'); 
//   }

//   async onModuleInit() {
//     await this.seedService.seed();
//   }
// }
