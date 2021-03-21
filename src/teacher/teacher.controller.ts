import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SubjectService } from 'src/base/services/subject.service';
import { TeacherService } from '../base/services/teacher.service';

@UseGuards(AuthGuard)
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

    @Post('add-teacher-to-subject')
    async addTeacherToSubject(@Body() body, @Req() req: Request) {
        const userData = req.params.userData;
        const userId = userData["id"];

        const { teacherId, subjectId } = body;
        const isOwner = await this.subjectService.isSubjectOwner(subjectId, userId);

        if(isOwner) {
            await this.teacherService.addTeacherToSubject(teacherId, subjectId);
            return;
        } else {
            throw new UnauthorizedException;
        }

    }

    
}
