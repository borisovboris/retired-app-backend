import { Logger, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AuthService } from '../base/services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private as: AuthService) {}

    @Post('teacher-register')
    async teacherRegister(@Body() teacher) {

        try {
          await this.as.register(teacher);
          return {success: "Successfully registered"};
        } catch(error) {
          return {error: "Registration failed"};
        }
      
    }

    @Post('teacher-login')
    async teacherLogin(@Body() body) {
      const { username, password } = body;
      const token = await this.as.login(username, password);
  
      if(token) {
        return { token_id: token };
      }

      return { message: 'user not found' };
    }

}
