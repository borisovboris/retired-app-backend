import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from '../base/services/subject.service';
import { SubjectsController } from './subjects.controller';
import { BaseModule } from 'src/base/base.module';
import { TeacherService } from 'src/base/services/teacher.service';
import { AuthService } from 'src/base/services/auth.service';

@Module({
  imports: [ BaseModule ],
  providers: [],
  controllers: [SubjectsController],
  exports: []
})
export class SubjectModule {

}
