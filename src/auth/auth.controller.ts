import { Logger } from '@nestjs/common';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { TeacherDto } from 'src/teacher/teacher.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private ts: TeacherService, private as: AuthService) {}

    @Post('teacher-register')
    async teacherRegister(
      @Response() response: Response,
      @Body() teacher: TeacherDto
      ): Promise<Object> {
       
          await this.ts.create(teacher);
          return {success: "Successfully registered"};
      
    }

    @Post('teacher-login')
    async teacherLogin(@Body() body): Promise<Object> {
      const { username, password } = body;
      const token = await this.as.login(username, password);
  
      if(token) {
        return { token };
      }

      return { message: 'user not found' };
    }

}
