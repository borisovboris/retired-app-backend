import { Body, Controller, Get, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { SubjectService } from '../base/services/subject.service';

@UseGuards(TeacherGuard)
@Controller('subjects')
export class SubjectsController {
    constructor(private subjectService: SubjectService) { }
    

    @Get(':id/topics')
    async getSubjectTopics(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const subjectId = params.id;

        const topics = await this.subjectService.getSubjectTopics(subjectId);
        return topics;
    }

    @Get(':id/teachers')
    async getSubjectTeachers(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const subjectId = params.id;
       
        const subjectTeachers = await this.subjectService.getSubjectTeachers(subjectId);
        return subjectTeachers;
    }

    @Get(':id')
    async getSubject(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const userId = userData['id'];
        const subjectId = params.id;

        const subject = await this.subjectService.getById(subjectId);
        const { id, name, creatorId } = subject;
        return { id, name, creatorId };

    }



    @Post()
    async createSubject(@Body() body, @Req() req: Request) {
        const userData = req.params.userData;
        await this.subjectService.createSubject(body.name, body.description, userData['id']);
        return;
    }

}


