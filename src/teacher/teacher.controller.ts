import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TeacherService } from './teacher.service';


@Controller('teachers')
export class TeacherController {
   constructor(private readonly teacherService: TeacherService) {}

    @Get('search/:criteria')
    async searchTeachers(@Param() params) {
        const criteria = params.criteria;
        const teachers = await this.teacherService.searchTeachers(criteria);
        return teachers;
    }

}
