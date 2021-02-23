import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsController } from './subjects/subjects.controller';

@Module({
  imports: [],
  controllers: [AppController, SubjectsController],
  providers: [AppService],
})
export class AppModule {}
