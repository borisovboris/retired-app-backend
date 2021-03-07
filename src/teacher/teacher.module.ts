import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherRepository])
],
  providers: [TeacherService],
  exports: [TeacherService],
  controllers: []
})
export class TeacherModule {}
