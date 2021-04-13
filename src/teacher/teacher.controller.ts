import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { SubjectService } from 'src/base/services/subject.service';
import { TeacherService } from '../base/services/teacher.service';

@UseGuards(TeacherGuard)
@Controller('teachers')
export class TeacherController {
   constructor(
       private readonly teacherService: TeacherService,
       private readonly subjectService: SubjectService
    ) {}

    @Get('search/:criteria')
    async searchTeachers(@Param() params) {
        const criteria = params.criteria;
        const teachers = await this.teacherService.searchTeachers(criteria);
        return teachers;
    }

    @Get('search')
    async emptySearch() {
        return null;
    }

    @Get('subjects')
    async getSubjects(@Req() req: Request) {
        const userData = req.params.userData;
        const userId = userData["id"];
        const userSubjects = await this.teacherService.getTeacherSubjects(userId);
        return userSubjects;
    }
    
}
