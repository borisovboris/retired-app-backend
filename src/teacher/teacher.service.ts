import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/teacher.entity';
import { Repository } from 'typeorm';
import { TeacherDto } from './teacher.dto';

@Injectable()
export class TeacherService {
    constructor(
    @InjectRepository(Teacher) 
    private teacherRepository: Repository<Teacher>
    ) {}

    /* A teacher entity first has to be instantiated and attributes 
    assigned to it, before saving it. Using object literals
    won't work because it doesn't have the BeforeInsert method on it
    (password has to be hashed before saved on the DB) */

    public async create(teacher: TeacherDto) {
        const entity = Object.assign(new Teacher(), teacher);
        await this.teacherRepository.save(entity);
    }

    public async findByUsername(username: string) {
        const teacher = await this.teacherRepository.findOne({ username });
        //We want to store everything but the teacher's password in result
        const { password, ...result } = teacher;
        return result;
    }

    public async comparePasswords(clientUsername: string, clientPassword: string): Promise<boolean> {
        const dbPassword = await this.getTeacherPassword(clientUsername);
        const match = bcrypt.compare(clientPassword, dbPassword);
        if(match) {
            return true;
        }
        
        return false;
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
