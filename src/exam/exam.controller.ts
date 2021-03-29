import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ExamService } from 'src/base/services/exam.service';

@UseGuards(TeacherGuard, RoleGuard('moderator'))
@Controller('exams')
export class ExamController {

    constructor(
        private readonly examService: ExamService
    ) {}

    @Get(':id/questions')
    async getExamQuestions(@Param() params) {
        const { id } = params;
        const questions = await this.examService.getExamQuestions(id);
        return questions;
    }

    @Get(':id')
    async getExam(@Param() params) {
        const { id } = params;
        const exam = await this.examService.getExam(id);
        return exam;
    }

    @Get()
    async getExams(@Req() req) {
        const subjectId = req.params.subjectId; // the roleguard will attach the subject id to the request
        const exams = await this.examService.getExams(subjectId);
        return exams;
    }

    @Post('add-question')
    async addQuestionToExam(@Body() body, @Req() req) {
        const { examId, questionId } = body;
        await this.examService.addQuestionToExam(examId, questionId);
    }

    @Post()
    async createExam(@Body() body, @Req() req) {
        const { name } = body;
        const subjectId = req.params.subjectId;
        this.examService.createExam(name, subjectId);
    }

    @Delete(':examId/delete-question/:questionId')
    async removeQuestionFromExam(@Param() params) {
        const {examId, questionId} = params;
        await this.examService.removeQuestionFromExam(examId, questionId);
    }
}
