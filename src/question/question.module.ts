import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [BaseModule],
  controllers: [QuestionController],
  providers: []
})
export class QuestionModule {}
