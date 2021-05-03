import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Exam } from '../entities/exam.entity';
import { Session } from '../entities/session.entity';
import { Teacher } from '../entities/teacher.entity';
import { Subject } from '../entities/subject.entity';
import { Student } from '../entities/student.entity';
import { StudentExam } from '../entities/student-exam.entity';
import { StudentQuestion } from '../entities/student-question.entity';
import { StudentAnswer } from '../entities/student-answer.entity';
import { StudentChoice } from '../entities/student-choice.entity';

@Injectable()
export class SessionService {
    private readonly examRepository: Repository<Exam>;
    private readonly subjectRepository: Repository<Subject>;
    private readonly teacherRepository: Repository<Teacher>;
    private readonly studentRepository: Repository<Student>;
    private readonly studentExamRepository: Repository<StudentExam>;
    private readonly studentQuestionRepository: Repository<StudentQuestion>;
    private readonly studentAnswerRepository: Repository<StudentAnswer>;
    private readonly studentChoiceRepository: Repository<StudentChoice>;

    constructor
        (
            @InjectRepository(Session)
            private readonly sessionRepository: Repository<Session>,
            private readonly connection: Connection
        ) {
        this.examRepository = this.connection.getRepository(Exam);
        this.subjectRepository = this.connection.getRepository(Subject);
        this.teacherRepository = this.connection.getRepository(Teacher);
        this.studentRepository = this.connection.getRepository(Student);
        this.studentExamRepository = this.connection.getRepository(StudentExam);
        this.studentQuestionRepository = this.connection.getRepository(StudentQuestion);
        this.studentAnswerRepository = this.connection.getRepository(StudentAnswer);
        this.studentChoiceRepository = this.connection.getRepository(StudentChoice);
    }

    async createSession(body: any, userId: any) {
        Logger.log(body);

        const { subjectId, examId, studentIds, name, date, startTime, endTime } = body;
        const subject = await this.subjectRepository.findOne({ id: subjectId });
        // creator
        const teacher = await this.teacherRepository.findOne({ id: userId });
        const exam = await this.examRepository.findOne({ id: examId }, { relations: ["questions", "questions.choices"] });

        const session = Object.assign(new Session(), { name, date, startTime, endTime, teacher, subject });
        const newSession = await this.sessionRepository.save(session);

        for (const studentId of studentIds) {
            const questions = exam.questions;
            Logger.log(questions);
            const student = await this.studentRepository.findOne({ id: studentId });

            const studentExam = Object.assign(new StudentExam(), { session: newSession, student });
            const newStudentExam = await this.studentExamRepository.save(studentExam);

            for (const question of questions) {
                const { title, type, maxPoints } = question;
                const newQuestion = await this.studentQuestionRepository
                    .save({ title, type, maxPoints, earnedPoints: 0, studentExam: newStudentExam });

                // we dont need the id for this question, it is individual for every student's exam
                if (question.type === 'closed') {
                    const choices = question.choices;

                    for (const choice of choices) {
                        const { text, isCorrect } = choice;
                        // by adding the question to this choice, typeorm automatically
                        // will connect the choice to the question
                        await this.studentChoiceRepository
                            .save({ text, isCorrect, choice: false, studentQuestion: newQuestion });
                    }
                } else if (question.type === 'open') {
                    await this.studentAnswerRepository
                        .save({ text: '', studentQuestion: newQuestion });
                }

            }
        }
    }

    async getSession(sessionId: number) {
        const session = await this.sessionRepository
            .findOne(
                { id: sessionId },
                {
                    relations: [
                        "studentExams",
                        "studentExams.student",
                        "studentExams.studentQuestions",
                        "studentExams.studentQuestions.studentAnswer",
                        "studentExams.studentQuestions.studentChoices"
                    ]
                }
            );

        const exams = await session.studentExams;
        const studentExams = [];

        for (let exam of exams) {
            let totalEarnedPoints: number = 0;
            let totalMaxPoints: number = 0;

            for (let studentQuestion of exam.studentQuestions) {
                totalMaxPoints += studentQuestion.maxPoints;

                Logger.log(JSON.stringify(studentQuestion));

                if (studentQuestion.type === 'open') {
                    totalEarnedPoints += studentQuestion.earnedPoints;
                } else if (studentQuestion.type === 'closed') {
                    let studentIsCorrect = true;
                    for (const studentChoice of studentQuestion.studentChoices) {
                        if (studentChoice.isCorrect !== studentChoice.choice) {
                            studentIsCorrect = false;
                            break;
                        }
                    }

                    if (studentIsCorrect) {
                        totalEarnedPoints += studentQuestion.earnedPoints;
                    }
                }

            }

            studentExams.push({
                totalEarnedPoints,
                totalMaxPoints,
                id: exam.id,
                student: {
                    id: exam.student.id,
                    username: exam.student.username,
                    facultyNumber: exam.student.facultyNumber
                }
            });

        }

        return {
            name: session.name,
            startTime: session.startTime,
            endTime: session.endTime,
            studentExams,
            exams
        };
    }

}
