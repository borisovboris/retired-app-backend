import { Module } from '@nestjs/common';
import { SubjectTeacherService } from './subject-teacher.service';

@Module({
  providers: [SubjectTeacherService]
})
export class SubjectTeachersModule {}
