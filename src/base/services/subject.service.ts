import { Injectable, Logger } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { TeacherService } from 'src/base/services/teacher.service';
import { Teacher } from 'src/base/entities/teacher.entity';
import { TeacherRO } from 'src/teacher/teacher.ro';
import { Subject } from 'src/base/entities/subject.entity';
import { Topic } from '../entities/topic.entity';
import { Student } from '../entities/student.entity';

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


    // THIS SHOULD BE IN TEACHER SERVICE NOT IN SUBJECT SERVICE


    async getById(subjectId: number): Promise<Subject> {
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

    async getSubjectTopics(subjectId: number): Promise<Topic[]> {
        const subject = await this.subjectRepository.findOne({id: subjectId}, { relations: ["topics"]});
        const topics = await subject.topics;
        return topics;
    }

    async getSubjectStudents(subjectId): Promise<Student[]> {
        const subject = await this.subjectRepository.findOne({id: subjectId}, { relations: ["students"]});
        const students = await subject.students;
        return students;
    }

    async isSubjectModerator(subjectId: number, userId: number): Promise<boolean> {
        const subjectTeachers = await this.getSubjectTeachers(subjectId);
        const condition = subjectTeachers.some((teacher) => teacher.id === userId);
        return condition;
    }

    async isSubjectOwner(subjectId: number, userId: number): Promise<boolean> {
        const subject = await this.getById(subjectId);
        return subject.creatorId == userId;
    }

    async addTeacherToSubject(teacherId: number, subjectId: number): Promise<void> {
        const teacher = await this.teacherRepository.findOne({ id: teacherId }, { relations: ['subjects']});
        const newSubject = await this.subjectRepository.findOne({ id: subjectId });
        const existingSubjects = await teacher.subjects;
        teacher.subjects = Promise.resolve([ ...existingSubjects, newSubject ]);
        await this.teacherRepository.save(teacher);
    }
    
    async removeTeacherFromSubject(subjectId: number, teacherId: number) {
        const subject = await this.subjectRepository.findOne({ id: subjectId }, { relations: ['teachers']});
        const teachers = await subject.teachers;
        const newTeachers = teachers.filter((teacher) => teacher.id != teacherId);
        subject.teachers = Promise.resolve(newTeachers);
        await this.subjectRepository.save(subject);
    }
}
