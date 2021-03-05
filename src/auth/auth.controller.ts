import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeacherDto } from 'src/teacher/teacher.dto';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller('auth')
export class AuthController {

    constructor(private ts: TeacherService)
    {}
    @Post('teacher-register')
    teacherRegister(@Body() teacher: TeacherDto) {
      this.ts.create(teacher);
    }
}
