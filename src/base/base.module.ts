import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/jwt/jwt.constants';
import { Student } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { Subject } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';
import { TopicService } from './services/topic.service';

@Module({
    imports: [TypeOrmModule.forFeature
        ([
        Subject, SubjectRepository, 
        Teacher, TeacherRepository,
        Student, StudentRepository
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s'}
          })
    ],
    providers: [
        AuthService, 
        SubjectService, 
        TeacherService, 
        StudentService, 
        TopicService
    ],
    exports: [
        AuthService, 
        SubjectService, 
        TeacherService, 
        StudentService, 
        TopicService
    ]
})
export class BaseModule {  
}
