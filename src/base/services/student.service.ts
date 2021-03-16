import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ){
        
    }

    async create(facultyNumber: string, name: string, email: string) {
        const entity = Object.assign(new Student(), { facultyNumber, name, email });
        await this.studentRepository.save(entity);
    }
}
