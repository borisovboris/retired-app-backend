import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherService } from 'src/teacher/teacher.service';
import { Teacher } from 'src/teacher/teacher.entity';

@Injectable()
export class SubjectService {
   

    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
        private readonly ts: TeacherService
        ) {}

    async createSubject(name: string, description: string, creatorId: number): Promise<void> {
        const teacher = await this.ts.findById(creatorId);

        const subject = Object.assign(new Subject(), { name, description, creatorId });
        subject.teachers = [ teacher ];
        await this.subjectRepository.save(subject);  
    }

    async getUserSubjects(userId: string) {
        const subjects = await this.ts.getTeacherSubjects(userId);
        return subjects;
    }
    
}
