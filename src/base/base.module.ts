import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { AnswerRepository } from 'src/answer/answer.repository';
import { jwtConstants } from 'src/auth/jwt/jwt.constants';
import { Exam } from 'src/exam/exam.entity';
import { ExamRepository } from 'src/exam/exam.repository';
import { Question } from 'src/question/question.entity';
import { QuestionRepository } from 'src/question/question.repository';
import { Student } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { Subject } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { Topic } from 'src/topic/topic.entity';
import { TopicRepository } from 'src/topic/topic.repository';
import { AuthService } from './services/auth.service';
import { ExamService } from './services/exam.service';
import { QuestionService } from './services/question.service';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { TopicService } from './services/topic.service';

@Module({
    imports: [TypeOrmModule.forFeature
        ([
        Subject, SubjectRepository, 
        Teacher, TeacherRepository,
        Student, StudentRepository,
        Topic, TopicRepository,
        Question, QuestionRepository,
        Answer, AnswerRepository,
        Exam, ExamRepository
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '36000s'}
          })
    ],
    providers: [
        AuthService, 
        SubjectService, 
        TeacherService, 
        StudentService, 
        TopicService,
        QuestionService,
        ExamService
    ],
    exports: [
        AuthService, 
        SubjectService, 
        TeacherService, 
        StudentService, 
        TopicService,
        QuestionService,
        ExamService
    ]
})
export class BaseModule {  
}
