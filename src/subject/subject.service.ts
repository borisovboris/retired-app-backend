import { Injectable, Logger } from '@nestjs/common';
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
        subject.teachers = Promise.resolve([ teacher ]);
        await this.subjectRepository.save(subject);  
    }

    async getUserSubjects(userId: string) {
        const subjects = await this.ts.getTeacherSubjects(userId);
        return subjects;
    }

    async getById(subjectId: number) {
        const id = subjectId;
        const subject = await this.subjectRepository.findOne(id, { relations: ['teachers'] } );
        return subject;
    }

    async isSubjectModerator(subject: Subject, userId: number): Promise<boolean> {
        const teachersOfSubject = await subject.teachers;
        const condition = teachersOfSubject.some((teacher) => teacher.id === userId);
        return condition;
    }
    
}
