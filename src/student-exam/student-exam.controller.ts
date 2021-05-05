import { Controller, Get, Param } from '@nestjs/common';
import { StudentExamService } from 'src/base/services/student-exam.service';

@Controller('student-exams')
export class StudentExamController {
    constructor
    (
        private readonly studentExamService: StudentExamService
    ) {}

    @Get(':id/teacher')
    async getStudentExamTeacher(@Param() params) {
        const studentExamId = params.id;
        const studentExam = await this.studentExamService.getStudentExamTeacher(studentExamId);
        return studentExam;
    }

    @Get(':id/student')
    async studentExamStudent() {

    }
}
