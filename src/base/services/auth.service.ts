import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherRO } from 'src/teacher/teacher.ro';
import { TeacherService } from 'src/base/services/teacher.service';
import { StudentService } from './student.service';
import { Request } from 'express';

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
            const token = await this.jwtService.signAsync({ teacherId: '' + teacher.id });
            return token;
        }

        return null;
    }

    public async registerTeacher(teacher): Promise<void> {
        this.teacherService.create(teacher);
    }

    public async loginStudent(username: string, password: string): Promise<string> {
        const result = await this.studentService.comparePasswords(username, password);

        if (result) {
            const student = await this.studentService.findByUsername(username);
            const token = await this.jwtService.signAsync({ studentId: '' + student.id });
            return token;
        }

        return null;
    }

    public async registerStudent(username, email, facultyNumber, password): Promise<void> {
        this.studentService.create(username, email, facultyNumber, password);
    }

    public async validateToken(tokenId: string): Promise<any> {
        return await this.jwtService.verifyAsync(tokenId);
    }

    public async checkUserOccupation(request: Request) {
        const authorizationHeaders = request.headers["authorization"];
        const bearerToken = authorizationHeaders.split(' ')[1];

        const tokenPayload = await this.validateToken(bearerToken);
        if(tokenPayload.studentId) {
            return { occupation: 'student' };
        } else if (tokenPayload.teacherId) {
            return { occupation: 'teacher'};
        } else {
            return null;
        }
    }

}
