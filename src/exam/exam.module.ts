import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { ExamController } from './exam.controller';

@Module({
  imports: [BaseModule],
  controllers: [ExamController],
  providers: []
})
export class ExamModule {}
