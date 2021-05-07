import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentExamRepository } from 'src/student-exam/student-exam.repository';
import { Connection, Repository } from 'typeorm';
import { StudentExam } from '../entities/student-exam.entity';
import { StudentQuestion } from '../entities/student-question.entity';

@Injectable()
export class StudentExamService {
    // private readonly studentQuestionRepository: Repository<StudentQuestion>;

    constructor
        (
            @InjectRepository(StudentExamRepository)
            private readonly studentExamRepository: Repository<StudentExam>,
            private readonly connection: Connection
        ) { }

    async getStudentExamWithQA(studentExamId: number) {
        const exam = await this.studentExamRepository
            .findOne(
                { id: studentExamId },
                {
                    relations: [
                        "student",
                        "studentQuestions",
                        "studentQuestions.studentAnswer",
                        "studentQuestions.studentChoices"
                    ]
                }
            );

        return exam;
    }

    // get detailed student exam with the earned and max points for each question
    async getStudentExamTeacher(studentExamId: number) {
        const exam = await this.getStudentExamWithQA(studentExamId);

        //calculate closed questions
        const studentQuestions = [];
        for (let question of exam.studentQuestions) {

            if (question.type === 'closed') {
                let earnedPoints = question.maxPoints;

                for (let choice of question.studentChoices) {
                    if (choice.choice !== choice.isCorrect) {
                        earnedPoints = 0;
                        break;
                    }
                }

                studentQuestions.push({
                    ...question, earnedPoints
                })
            } else if (question.type === 'open') {
                studentQuestions.push({ ...question })
            }

        }

        const studentExam = {
            id: exam.id,
            student: {
                username: exam.student.username,
                facultyNumber: exam.student.facultyNumber
            },
            studentQuestions: studentQuestions
        };

        return studentExam;
    }

    async getStudentExamStudent(studentExamId: number) {
        const exam = await this.getStudentExamWithQA(studentExamId);

        const studentQuestions = [];
        for (let question of exam.studentQuestions) {
            
            if (question.type === 'closed') {
                let numCorrectChoices = 0;
                const filteredChoices = [];
                for (let choice of question.studentChoices) {
                    // filter out isCorrect, because the student shouldnt know if the choice
                    // is correct or not 
                    const { isCorrect, ...rest} = choice;
                    filteredChoices.push({
                        ...rest
                    });
                    if (choice.isCorrect === true) {
                      numCorrectChoices++;
                    }
                }

                question.studentChoices = filteredChoices;
                studentQuestions.push({
                    ...question, numCorrectChoices
                })
            } else if (question.type === 'open') {
                studentQuestions.push({ ...question })
            }

        }

        const studentExam = {
            id: exam.id,
            student: {
                username: exam.student.username,
                facultyNumber: exam.student.facultyNumber
            },
            studentQuestions: studentQuestions
        };

        return studentExam;

    }



    // async getSubjectExamsOfStudent(studentId: number, subjectId: number) {
    //     // important to avoid SQL INJECTIONS
    //     const studentExamIds = await this.studentExamRepository
    //         .createQueryBuilder('student-exam')
    //         .innerJoin('student-exam.student', 'student')
    //         .where('student.id = :studentId', { studentId })
    //         .innerJoin('student-exam.session', 'session')
    //         .andWhere('session.subjectId = :subjectId', { subjectId })
    //         .getMany();

    //     const exams = [];


    // }




}
