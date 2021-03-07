import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from 'src/subject/subject.module';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'
import { jwtConstants } from './jwt/jwt.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TeacherModule, SubjectModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s'}
  })]
})
export class AuthModule {}
