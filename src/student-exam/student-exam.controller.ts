import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { StudentGuard } from 'src/auth/student.guard';
import { StudentExamService } from 'src/base/services/student-exam.service';

@Controller('student-exams')
export class StudentExamController {
    constructor
    (
        private readonly studentExamService: StudentExamService
    ) {}
    
    // @UseGuards(StudentGuard)
    // @Get('for-subject/:id')
    // async getSubjectExamsOfStudent(@Param() params, @Req() req: Request) {
    //     const subjectId = params.id;
    //     const userData = req.params.userData;
    //     const studentId = userData["id"];
    //     await this.studentExamService.getSubjectExamsOfStudent(studentId, subjectId);
    // }

    @Get(':id/teacher')
    async getStudentExamTeacher(@Param() params) {
        const studentExamId = params.id;
        const studentExam = await this.studentExamService.getStudentExamTeacher(studentExamId);
        return studentExam;
    }

    @Get(':id/student')
    async getStudentExamStudent(@Param() params) {
        const studentExamId = params.id;
        const studentExam = await this.studentExamService.getStudentExamStudent(studentExamId);
        return studentExam;
    }
}
