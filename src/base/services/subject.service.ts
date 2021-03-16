import { Injectable, Logger } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { TeacherService } from 'src/base/services/teacher.service';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherRO } from 'src/teacher/teacher.ro';
import { Subject } from 'src/subject/subject.entity';

@Injectable()
export class SubjectService {
   teacherRepository: Repository<Teacher>;

    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
        private readonly connection: Connection
        ) {
            this.teacherRepository = this.connection.getRepository(Teacher);
        }

    async createSubject(name: string, description: string, creatorId: number): Promise<void> {
        const id = creatorId;
        const teacher = await this.teacherRepository.findOne( id );

        const subject = Object.assign(new Subject(), { name, description, creatorId });
        subject.teachers = Promise.resolve([ teacher ]);
        await this.subjectRepository.save(subject);  
    }

    async getUserSubjects(userId: number) {
        const id = userId;
        const teacher = await this.teacherRepository.findOne( id, {relations: ['subjects']} );
        const subjects = await teacher.subjects;

        return subjects;
    }

    async getById(subjectId: number) {
        const id = subjectId;
        const subject = await this.subjectRepository.findOne(id, { relations: ['teachers'] });
        // relations are needed in order to get a subject and save a teacher in its teachers array
        return subject;
    }

    async getSubjectTeachers(subjectId: number) {
        const id = subjectId;
        const subject = await this.subjectRepository.findOne(id, { relations: ['teachers'] } );
        const subjectTeachers = await (await subject.teachers).map(el => { 
            return {id: el.id, username: el.username, email: el.email } 
        });
        return subjectTeachers;
    }

    async isSubjectModerator(subjectId: number, userId: number): Promise<boolean> {
        const subjectTeachers = await this.getSubjectTeachers(subjectId);
        const condition = subjectTeachers.some((teacher) => teacher.id === userId);
        return condition;
    }

    async isSubjectOwner(subjectId: number, userId: number) {
        const subject = await this.getById(subjectId);
        return subject.creatorId == userId;
    }
    
}
