import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from 'src/base/entities/choice.entity';
import { ChoiceRepository } from 'src/choice/choice.repository';
import { jwtConstants } from 'src/auth/jwt/jwt.constants';
import { Exam } from 'src/base/entities/exam.entity';
import { ExamRepository } from 'src/exam/exam.repository';
import { Question } from 'src/base/entities/question.entity';
import { QuestionRepository } from 'src/question/question.repository';
import { Student } from 'src/base/entities/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { Subject } from 'src/base/entities/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { Teacher } from 'src/base/entities/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { Topic } from 'src/base/entities/topic.entity';
import { TopicRepository } from 'src/topic/topic.repository';
import { AuthService } from './services/auth.service';
import { ExamService } from './services/exam.service';
import { QuestionService } from './services/question.service';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { TopicService } from './services/topic.service';
import { SessionRepository } from 'src/session/session.repository';
import { Session } from './entities/session.entity';
import { SessionService } from './services/session.service';
import { StudentAnswer } from './entities/student-answer.entity';
import { StudentAnswerRepository } from 'src/student-answer/student-answer.repository';
import { StudentExamService } from './services/student-exam.service';
import { StudentExam } from './entities/student-exam.entity';
import { StudentExamRepository } from 'src/student-exam/student-exam.repository';
import { StudentQuestionService } from './services/student-question.service';
import { StudentQuestionRepository } from 'src/student-question/student-question.repository';
import { StudentQuestion } from './entities/student-question.entity';

@Module({
    imports: [TypeOrmModule.forFeature
        ([
        Subject, SubjectRepository, 
        Teacher, TeacherRepository,
        Student, StudentRepository,
        Topic, TopicRepository,
        Question, QuestionRepository,
        Choice, ChoiceRepository,
        Exam, ExamRepository,
        Session, SessionRepository,
        StudentAnswer, StudentAnswerRepository,
        StudentExam, StudentExamRepository,
        StudentQuestion, StudentQuestionRepository
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
        ExamService,
        SessionService,
        StudentExamService,
        StudentQuestionService
    ],
    exports: [
        AuthService, 
        SubjectService, 
        TeacherService, 
        StudentService, 
        TopicService,
        QuestionService,
        ExamService,
        SessionService,
        StudentExamService,
        StudentQuestionService
    ]
})
export class BaseModule {  
}
