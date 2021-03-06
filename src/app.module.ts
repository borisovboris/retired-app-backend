import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectService } from './subjects/subject/subject.service'
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    logging: true
  }), TeacherModule, AuthModule],
  controllers: [AppController, SubjectsController],
  providers: [AppService, SubjectService],
})
export class AppModule { }
