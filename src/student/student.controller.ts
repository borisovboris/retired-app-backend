import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { StudentGuard } from 'src/auth/student.guard';
import { StudentService } from 'src/base/services/student.service';


@UseGuards(StudentGuard)
@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Get('search/:criteria')
    async searchStudent(@Param() params) {
        const { criteria } = params;
        const students = await this.studentService.searchStudent(criteria);
        return students;
    }

    @Post('add-student-to-subject')
    async addStudentToSubject(@Body() body) {
        const { studentId, subjectId } = body;
        await this.studentService.addStudentToSubject(studentId, subjectId);
        return;
    }

    @Get('subjects')
    async getSubjects(@Req() req: Request) {
        const userData = req.params.userData;
        const studentId = userData["id"];
        const subjects = await this.studentService.getSubjectsOfStudent(studentId);
        return subjects;
    }
}
