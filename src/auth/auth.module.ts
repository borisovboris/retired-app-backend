import { Module } from '@nestjs/common';
import { TeacherModule } from 'src/teacher/teacher.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TeacherModule]
})
export class AuthModule {}
