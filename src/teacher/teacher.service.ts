import { Injectable, Logger } from '@nestjs/common';
import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/teacher.entity';
import { Connection } from 'typeorm';
import { TeacherDto } from './teacher.dto';
import { TeacherRepository } from './teacher.repository';
import { Subject } from 'rxjs';

@Injectable()
export class TeacherService {
    teacherRepository: TeacherRepository;

    constructor(private connection: Connection) {
        this.teacherRepository = this.connection.getCustomRepository(TeacherRepository);
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
        return await bcrypt.compare(clientPassword, dbPassword);
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
