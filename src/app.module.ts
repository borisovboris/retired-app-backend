import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { BaseModule } from './base/base.module';
import { TopicModule } from './topic/topic.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ExamModule } from './exam/exam.module';
import { SessionModule } from './session/session.module';


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
  TopicModule, QuestionModule, AnswerModule, ExamModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
