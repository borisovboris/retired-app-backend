import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherRO } from 'src/teacher/teacher.ro';
import { TeacherService } from 'src/base/services/teacher.service';
import { StudentService } from './student.service';

@Injectable()
export class AuthService {

    constructor
        (
            private teacherService: TeacherService,
            private jwtService: JwtService,
            private studentService: StudentService
        ) { }

    public async loginTeacher(username: string, password: string): Promise<string> {
        const result = await this.teacherService.comparePasswords(username, password);

        if (result) {
            const teacher: TeacherRO = await this.teacherService.findByUsername(username);
            const token = await this.jwtService.signAsync({ id: '' + teacher.id });
            return token;
        }

        return null;
    }

    public async registerTeacher(teacher) {
        this.teacherService.create(teacher);
    }

    public async loginStudent(username: string, password: string) {
        const result = await this.studentService.comparePasswords(username, password);

        if (result) {
            const student = await this.studentService.findByUsername(username);
            const token = await this.jwtService.signAsync({ id: '' + student.id });
            return token;
        }

        return null;
    }

    public async registerStudent(username, email, facultyNumber, password) {
        this.studentService.create(username, email, facultyNumber, password);
    }

    public async validateToken(tokenId: string): Promise<any> {
        return await this.jwtService.verifyAsync(tokenId);
    }


}
