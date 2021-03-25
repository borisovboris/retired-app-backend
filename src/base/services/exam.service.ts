import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/exam/exam.entity';
import { Question } from 'src/question/question.entity';
import { Subject } from 'src/subject/subject.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ExamService {
    private readonly subjectRepository: Repository<Subject>;
    private readonly questionRepository: Repository<Question>;

    constructor(
        @InjectRepository(Exam)
        private readonly examRepository: Repository<Exam>,
        private readonly connection: Connection
    ) {
        this.subjectRepository = this.connection.getRepository(Subject);
        this.questionRepository = this.connection.getRepository(Question);
    }

    public async createExam(name: string, subjectId: number) {
        const examEntity = Object.assign(new Exam(), { name });
        const subject = await this.subjectRepository.findOne({id: subjectId});
        examEntity.subject = subject;
        await this.examRepository.save(examEntity);
        return;
    }

    public async getExams(subjectId: number) {
        const subject = await this.subjectRepository.findOne({id: subjectId}, { relations: ["exams"]});
        const exams = await subject.exams;
        return exams;
    }

    public async getExam(examId: number) {
        const exam = await this.examRepository.findOne({id: examId}, {relations: ["questions"]});
        return exam;
    }

    public async addQuestionToExam(examId: number, questionId: number) {
        Logger.log("service -------" + examId + "          " + questionId);
        const exam = await this.examRepository.findOne({ id: examId });
        const question = await this.questionRepository.findOne({ id: questionId });
        // exam.questions = Promise.resolve([question]);
        (await exam.questions).push(question);
        await this.examRepository.save(exam);
        return;
    }

    // const id = subjectId;
    // const teacher = await this.findById(teacherId);
    // const subject = await this.subjectRepository.findOne(id);
    // teacher.subjects = Promise.resolve([ subject ]);
    // await this.teacherRepository.save(teacher);

    public async getExamQuestions(examId: number) {
        const exam = await this.examRepository.findOne({ id: examId }, { relations: ["questions"] });
        const questions = await exam.questions;
        return questions;
    }
}
