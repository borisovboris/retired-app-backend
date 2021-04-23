import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { SubjectService } from '../base/services/subject.service';

@UseGuards(TeacherGuard)
@Controller('subjects')
export class SubjectsController {
    constructor(private subjectService: SubjectService) { }

    @Get(':id/exams')
    async getSubjectExams(@Req() req: Request, @Param() params) {
        const subjectId = params.id;
        const exams = await this.subjectService.getSubjectExams(subjectId);
        return exams;
    }

    @Get(':id/topics')
    async getSubjectTopics(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const subjectId = params.id;

        const topics = await this.subjectService.getSubjectTopics(subjectId);
        return topics;
    }

    @Get(':id/teachers')
    async getSubjectTeachers(@Req() req: Request, @Param() params) {
        const subjectId = params.id;

        const subjectTeachers = await this.subjectService.getSubjectTeachers(subjectId);
        return subjectTeachers;
    }

    @Get(':id/students')
    async getSubjectStudents(@Param() params) {
        const subjectId = params.id;
        const subjectStudents = await this.subjectService.getSubjectStudents(subjectId);
        return subjectStudents;
    }

    @Get(':id')
    async getSubject(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const userId = userData['id'];
        const subjectId = params.id;

        const subject = await this.subjectService.getById(subjectId);
        const { id, name, creatorId, description } = subject;
        return { id, name, creatorId, description };

    }

    @Post('add-teacher-to-subject')
    async addTeacherToSubject(@Body() body, @Req() req: Request) {
        const userData = req.params.userData;
        const userId = userData["id"];

        const { teacherId, subjectId } = body;
        await this.subjectService.addTeacherToSubject(teacherId, subjectId);
    }

    @Post()
    async createSubject(@Body() body, @Req() req: Request) {
        const userData = req.params.userData;
        await this.subjectService.createSubject(body.name, body.description, userData['id']);
        return;
    }

    @UseGuards(TeacherGuard)
    @Delete(':subjectId/remove-teacher-from-subject/:teacherId')
    async removeTeacherFromSubject(@Param() params, @Req() req: Request) {
        const { subjectId, teacherId } = params;
        const userData = req.params.userData;
        const userId = userData["id"];

        // a teacher cannot remove himself from a subject
        if(teacherId == userId) {
            return;
        }

        await this.subjectService.removeTeacherFromSubject(subjectId, teacherId);
    }

}


