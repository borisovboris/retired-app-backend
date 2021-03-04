import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';

@Module({
  providers: [TeacherService, TeacherRepository],
  exports: [TeacherService]
})
export class TeacherModule {}
