import { Module } from '@nestjs/common';
import { StudentAnswerController } from './student-answer.controller';

@Module({
  controllers: [StudentAnswerController]
})
export class StudentAnswerModule {}
