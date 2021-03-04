import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(
    @InjectRepository(Teacher) 
    private readonly teacherRepository: Repository<Teacher>
    ) {}

    public async create(username: string, email: string, password: string) {
        const user = {username, email, password}
        this.teacherRepository.save(user);
    }

    text(): string {
        return 'hi';
    }

}
