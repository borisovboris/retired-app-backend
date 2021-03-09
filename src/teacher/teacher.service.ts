import { Injectable, Logger } from '@nestjs/common';
import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/teacher.entity';
import { Connection, Repository } from 'typeorm';
import { TeacherDto } from './teacher.dto';
import { TeacherRepository } from './teacher.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) 
        private readonly teacherRepository: Repository<Teacher>
        ) {
    }

    public async create(teacher: TeacherDto) {    
        const entity = Object.assign(new Teacher(), teacher);
        await this.teacherRepository.save(entity);
    }

    public async findByUsername(username: string) {
        const teacher = await this.teacherRepository.findOne({ username });
        const { password, ...result } = teacher;
        return result;
    }

    public async comparePasswords(clientUsername: string, clientPassword: string): Promise<boolean> {
        const dbPassword = await this.getTeacherPassword(clientUsername);
        const result = await bcrypt.compare(clientPassword, dbPassword);
        return result;
    }

    public async getHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async getTeacherPassword(username: string): Promise<string> {
        const teacher = await this.teacherRepository.findOne({ username });
        return teacher.password;
    }

}
