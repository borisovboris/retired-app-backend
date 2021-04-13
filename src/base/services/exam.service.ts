import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/base/entities/exam.entity';
import { Question } from 'src/base/entities/question.entity';
import { Subject } from 'src/base/entities/subject.entity';
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

    public async createExam(name: string, subjectId: number): Promise<void> {
        const examEntity = Object.assign(new Exam(), { name });
        const subject = await this.subjectRepository.findOne({id: subjectId});
        examEntity.subject = subject;
        await this.examRepository.save(examEntity);
        return;
    }

    public async getExams(subjectId: number): Promise<Exam[]> {
        const subject = await this.subjectRepository.findOne({id: subjectId}, { relations: ["exams"]});
        const exams = await subject.exams;
        return exams;
    }

    public async getExam(examId: number): Promise<Exam> {
        const exam = await this.examRepository.findOne({id: examId}, {relations: ["questions"]});
        return exam;
    }

    public async addQuestionToExam(examId: number, questionId: number): Promise<void> {
        const exam = await this.examRepository.findOne({ id: examId });
        const newQuestion = await this.questionRepository.findOne({ id: questionId });
        const questions = await exam.questions;
        exam.questions = Promise.resolve([...questions, newQuestion]);
        // (await exam.questions).push(question);
        await this.examRepository.save(exam);
        return;
    }

    public async getExamQuestions(examId: number): Promise<Question[]> {
        const exam = await this.examRepository.findOne({ id: examId }, { relations: ["questions", "questions.answers"] });
        // question.answers of question entity is no longer a promise because of later complex implementation
        const questions = await exam.questions;
        return questions;
    }

    async removeQuestionFromExam(examId: number, questionId: number): Promise<void> {
        const exam = await this.examRepository.findOne({ id: examId }, { relations: ["questions"] });
        const questions = await exam.questions;
        // the new questions have to be turned into a promise object or they cant be saved in exam.questions
        exam.questions = Promise.resolve(questions.filter(question => question.id != questionId));
        await this.examRepository.save(exam);
    }
}
