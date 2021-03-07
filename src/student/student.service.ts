import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
    studentRepository: StudentRepository;

    constructor(private connection: Connection){
        this.studentRepository = this.connection.getCustomRepository(StudentRepository);
    }

    async create(facultyNumber: string, name: string, email: string) {
        const entity = Object.assign(new Student(), { facultyNumber, name, email });
        await this.studentRepository.save(entity);
    }
}
