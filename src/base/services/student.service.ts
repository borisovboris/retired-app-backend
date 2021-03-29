import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/base/entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ){
        
    }

    async create(username, email, facultyNumber, password) {
        const entity = Object.assign(new Student(), { username, email, facultyNumber, password });
        await this.studentRepository.save(entity);
    }

    async findByUsername(username: string) {
        const student = await this.studentRepository.findOne({ username });
        return student;
    }

    public async comparePasswords(clientUsername: string, clientPassword: string): Promise<boolean> {
        const dbPassword = await this.getStudentPassword(clientUsername);
        const result = await bcrypt.compare(clientPassword, dbPassword);
        return result;
    }

    private async getStudentPassword(username: string): Promise<string> {
        const student = await this.studentRepository.findOne({ username });
        return student.password;
    }
}
