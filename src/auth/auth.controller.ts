import { Controller, Get, Post } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller('auth')
export class AuthController {

    constructor(private TeacherService: TeacherService)
    {}
    @Post('teacher-register')
    teacherRegister(): string {
        console.log('somethinggg');
        return this.TeacherService.text();
    }
}
