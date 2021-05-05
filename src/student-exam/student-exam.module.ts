import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { StudentExamController } from './student-exam.controller';

@Module({
  controllers: [ StudentExamController ],
  imports: [ BaseModule ]
})
export class StudentExamModule {}
