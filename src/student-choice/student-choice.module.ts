import { Module } from '@nestjs/common';
import { StudentChoiceController } from './student-choice.controller';

@Module({
  controllers: [StudentChoiceController]
})
export class StudentChoiceModule {}
