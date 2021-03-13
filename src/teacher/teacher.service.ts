import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/teacher.entity';
import { Like, Repository } from 'typeorm';
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
        const id = teacherId;
        const result = await this.teacherRepository.findOne(id);
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
        const subjects = await teacher.subjects;
        return subjects;
    }

    public async searchTeachers(criteria: string) {
        const result = await this.teacherRepository
        .find({ where: [ {username: Like(`%${criteria}%`)}, {email: Like(`%${criteria}%`)} ] });
        const teachers = result.map((el) => {
            return {id: el.id, username: el.username, email: el.email}
        });
        return teachers;
    }


}
