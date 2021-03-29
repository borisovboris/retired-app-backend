import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from 'src/base/services/student.service';


@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post()
    async create(@Body() body) {
        // const { username, email, facultyNumber, password } = body;
        // await this.studentService.create(username, email, facultyNumber, password);
    }
}
