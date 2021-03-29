import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../base/entities/teacher.entity';
import { TeacherRepository } from './teacher.repository';
import { TeacherController } from './teacher.controller';
import { BaseModule } from 'src/base/base.module';
import { TeacherService } from 'src/base/services/teacher.service';
import { SubjectService } from 'src/base/services/subject.service';
import { AuthService } from 'src/base/services/auth.service';


@Module({
  imports: [BaseModule],
  providers: [],
  controllers: [TeacherController]
})
export class TeacherModule {}
