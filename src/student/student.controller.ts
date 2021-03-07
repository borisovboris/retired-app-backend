import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
    constructor(private ss: StudentService){}

    @Post()
    async create(@Body() body) {
        const { facultyNumber, name, email } = body;
        await this.ss.create(facultyNumber, name, email);
    }
}
