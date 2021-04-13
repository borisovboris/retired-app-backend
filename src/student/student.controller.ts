import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { StudentGuard } from 'src/auth/student.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { StudentService } from 'src/base/services/student.service';



@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService){}

    @UseGuards(TeacherGuard)
    @Get('search/:criteria')
    async searchStudent(@Param() params) {
        const { criteria } = params;
        const students = await this.studentService.searchStudent(criteria);
        return students;
    }

    @UseGuards(StudentGuard)
    @Get('subjects')
    async getSubjects(@Req() req: Request) {
        const userData = req.params.userData;
        const studentId = userData["id"];
        const subjects = await this.studentService.getSubjectsOfStudent(studentId);
        return subjects;
    }

    @Post('add-student-to-subject')
    async addStudentToSubject(@Body() body) {
        const { studentId, subjectId } = body;
        await this.studentService.addStudentToSubject(studentId, subjectId);
        return;
    }

    @Delete('/:studentId/remove-student-from-subject/:subjectId')
    async removeStudentFromSubject(@Param() params) {
        const { studentId, subjectId } = params;
        await this.studentService.removeStudentFromSubject(studentId, subjectId);
    }

}
