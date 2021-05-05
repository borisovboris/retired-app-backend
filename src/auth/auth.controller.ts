import { Logger, Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../base/services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('check-occupation')
    async checkUserOccupation(@Req() req: Request) {
      const occupation = await this.authService.checkUserOccupation(req);
      return occupation;
    }

    @Post('teacher-register')
    async teacherRegister(@Body() teacher) {

        try {
          await this.authService.registerTeacher(teacher);
          return {success: "Successfully registered"};
        } catch(error) {
          return {error: "Registration failed"};
        }
      
    }

    @Post('teacher-login')
    async teacherLogin(@Body() body) {
      const { username, password } = body;
      const token = await this.authService.loginTeacher(username, password);
  
      if(token) {
        return { token_id: token };
      }

      return { message: 'user not found' };
    }

    @Post('student-register')
    async studentRegister(@Body() body) {

      const { username, email, facultyNumber, password } = body;
        try {
          await this.authService.registerStudent(username, email, facultyNumber, password);
          return {success: "Successfully registered"};
        } catch(error) {
          return {error: "Registration failed"};
        }
      
    }

    @Post('student-login')
    async studentLogin(@Body() body) {
      const { username, password } = body;
      const token = await this.authService.loginStudent(username, password);
  
      if(token) {
        return { token_id: token };
      }

      return { message: 'user not found' };
    }

}
