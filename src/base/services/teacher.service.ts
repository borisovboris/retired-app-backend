import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/base/entities/teacher.entity';
import { Connection, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRO } from '../../teacher/teacher.ro';
import { SubjectService } from 'src/base/services/subject.service';
import { Subject } from 'src/base/entities/subject.entity';

@Injectable()
export class TeacherService {
    subjectRepository: Repository<Subject>;

    constructor(
        @InjectRepository(Teacher) 
        private readonly teacherRepository: Repository<Teacher>,
        private readonly connection: Connection
        ) {
            this.subjectRepository = this.connection.getRepository(Subject);
        }

    public async create(teacher): Promise<void> {    
        const entity = Object.assign(new Teacher(), teacher);
        await this.teacherRepository.save(entity);
    }

    public async findByUsername(teacherUsername: string): Promise<any> {
        const result = await this.teacherRepository.findOne({ username: teacherUsername });
        const { id, username, email } = result;
        const teacher: TeacherRO = { id, username, email};
        return teacher;
    }

    public async findById(teacherId: number): Promise<Teacher> {
        const id = teacherId;
        const result = await this.teacherRepository.findOne(id, {relations: ['subjects'] });
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

    public async getTeacherSubjects(teacherId: string): Promise<Subject[]> {
        const id = teacherId;
        const teacher = await this.teacherRepository.findOne(id, { relations: ["subjects"]});
        const subjects = await teacher.subjects;
        return subjects;
    }

    public async searchTeachers(criteria: string): Promise<any> {
        const result = await this.teacherRepository
        .find({ where: [ {username: Like(`%${criteria}%`)}, {email: Like(`%${criteria}%`)} ] });
        const teachers = result.map((el) => {
            return {id: el.id, username: el.username, email: el.email}
        });
        return teachers;
    }

}
