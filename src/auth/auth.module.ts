import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from '../base/services/auth.service'
import { jwtConstants } from './jwt/jwt.constants';
import { BaseModule } from 'src/base/base.module';
import { TeacherService } from 'src/base/services/teacher.service';
import { SubjectService } from 'src/base/services/subject.service';
import { TeacherGuard } from './teacher.guard';

@Module({
  controllers: [AuthController],
  providers: [ ],
  imports: [ BaseModule ],
  exports: []
})
export class AuthModule {}
