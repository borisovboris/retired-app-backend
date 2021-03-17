import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { TopicController } from './topic.controller';

@Module({
  controllers: [TopicController],
  imports: [BaseModule]
})
export class TopicModule {}
