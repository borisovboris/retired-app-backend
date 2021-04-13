import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/base/entities/student.entity';
import { Connection, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Subject } from '../entities/subject.entity';


@Injectable()
export class StudentService {

    private subjectRepository: Repository<Subject>;
    
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly connection: Connection
    ){
        this.subjectRepository = this.connection.getRepository(Subject);
    }

    async create(username, email, facultyNumber, password): Promise<void> {
        const entity = Object.assign(new Student(), { username, email, facultyNumber, password });
        await this.studentRepository.save(entity);
    }

    async findByUsername(username: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ username });
        return student;
    }

    async findById(studentId): Promise<Student> {
        const student = await this.studentRepository.findOne({ id: studentId });
        return student;
    }

    public async comparePasswords(clientUsername: string, clientPassword: string): Promise<boolean> {
        const dbPassword = await this.getStudentPassword(clientUsername);
        const result = await bcrypt.compare(clientPassword, dbPassword);
        return result;
    }

    private async getStudentPassword(username: string): Promise<string> {
        const student = await this.studentRepository.findOne({ username });
        return student.password;
    }

    async searchStudent(criteria: string): Promise<any> {
        const result = await this.studentRepository
        .find({ where: [ {username: Like(`%${criteria}%`)}, {email: Like(`%${criteria}%`)}, {facultyNumber: Like(`%${criteria}%`)} ] });
        const students = result.map((el) => {
            return {id: el.id, username: el.username, email: el.email}
        });
        return students;
    }

    async addStudentToSubject(studentId, subjectId): Promise<void> {
        const student = await this.studentRepository.findOne({id: studentId});
        const subject = await this.subjectRepository.findOne({id: subjectId}); 
        const students = await subject.students;
        subject.students = Promise.resolve([...students, student]);
        await this.subjectRepository.save(subject);
        return;
    }

    async getSubjectsOfStudent(studentId): Promise<Subject[]> {
        const student = await this.studentRepository.findOne({ id: studentId }, {relations: ['subjects'] });
        const subjects = await student.subjects;
        return subjects;
    }

    async removeStudentFromSubject(studentId, subjectId): Promise<void> {
        const subject = await this.subjectRepository.findOne({ id: subjectId }, { relations: ['students'] });
        const subjectStudents = await subject.students;
        const newStudents = subjectStudents.filter(student => student.id != studentId);
        subject.students = Promise.resolve(newStudents);
        await this.subjectRepository.save(subject);
    }
}
