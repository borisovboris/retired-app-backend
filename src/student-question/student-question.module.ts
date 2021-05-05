import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { StudentQuestionController } from './student-question.controller';

@Module({
  controllers: [ StudentQuestionController ],
  imports: [ BaseModule ]
})
export class StudentQuestionModule {}
