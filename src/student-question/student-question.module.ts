import { Module } from '@nestjs/common';
import { StudentQuestionController } from './student-question.controller';

@Module({
  controllers: [StudentQuestionController]
})
export class StudentQuestionModule {}
