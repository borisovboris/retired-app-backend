import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/teacher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRO } from './teacher.ro';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) 
        private readonly teacherRepository: Repository<Teacher>
        ) {
    }

    public async create(teacher) {    
        const entity = Object.assign(new Teacher(), teacher);
        await this.teacherRepository.save(entity);
    }

    public async findByUsername(teacherUsername: string) {
        const result = await this.teacherRepository.findOne({ username: teacherUsername });
        const { id, username, email } = result;
        const teacher: TeacherRO = { id, username, email};
        return teacher;
    }

    public async findById(teacherId: number) {
        const result = await this.teacherRepository.findOne(teacherId);
        // const { id, username, email } = result;
        // const teacher: TeacherRO = { id, username, email};
        return result;
    }

    public async comparePasswords(clientUsername: string, clientPassword: string): Promise<boolean> {
        const dbPassword = await this.getTeacherPassword(clientUsername);
        const result = await bcrypt.compare(clientPassword, dbPassword);
        return result;
    }

    private async getTeacherPassword(username: string): Promise<string> {
        const teacher = await this.teacherRepository.findOne({ username });
        return teacher.password;
    }

    public async getTeacherSubjects(teacherId: string) {
        const id = teacherId;
        const teacher = await this.teacherRepository.findOne(id, { relations: ["subjects"]});
        return teacher.subjects;
    }

}
