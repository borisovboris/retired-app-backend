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
import { AnswerModule } from './choice/choice.module';
import { ExamModule } from './exam/exam.module';
import { SessionModule } from './session/session.module';
import { StudentExamModule } from './student-exam/student-exam.module';
import { StudentQuestionModule } from './student-question/student-question.module';
import { StudentAnswerModule } from './student-answer/student-answer.module';
import { StudentChoiceModule } from './student-choice/student-choice.module';


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
  TopicModule, QuestionModule, AnswerModule, ExamModule, SessionModule, StudentExamModule, StudentQuestionModule, StudentAnswerModule, StudentChoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
