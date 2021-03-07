import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';
import { SubjectsController } from './subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectRepository])],
  providers: [SubjectService],
  controllers: [SubjectsController],
  exports: [SubjectService]
})
export class SubjectModule {

}