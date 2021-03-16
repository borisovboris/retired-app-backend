import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { SubjectTeachersModule } from './subject-teachers/subject-teachers.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { BaseModule } from './base/base.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
  }), 
  BaseModule,
  TeacherModule, 
  AuthModule, 
  SubjectModule, 
  StudentModule, 
  SubjectTeachersModule, TopicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
