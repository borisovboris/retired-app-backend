import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { Student } from '../base/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { StudentService } from 'src/base/services/student.service';

@Module({
  imports: [ BaseModule ],
  providers: [],
  controllers: [StudentController]
})
export class StudentModule {}
