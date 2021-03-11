import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeacherModule } from 'src/teacher/teacher.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'
import { jwtConstants } from './jwt/jwt.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TeacherModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '600s'}
  })],
  exports: [AuthService]
})
export class AuthModule {}
