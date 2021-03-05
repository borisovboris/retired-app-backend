import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule {}
