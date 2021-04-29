import { Module } from '@nestjs/common';
import { StudentExamController } from './student-exam.controller';

@Module({
  controllers: [StudentExamController]
})
export class StudentExamModule {}
