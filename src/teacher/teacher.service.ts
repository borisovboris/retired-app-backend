import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

}
