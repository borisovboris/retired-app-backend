import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

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
