import { Injectable } from '@nestjs/common';
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
        ) { }

    async getStudentExamTeacher(studentExamId: number) {
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
            } else if(question.type === 'open') {
                studentQuestions.push({ ...question })
            }

        }

        const studentExam = {
            id: exam.id,
            student: {
                id: exam.student.id,
                username: exam.student.username,
                facultyNumber: exam.student.facultyNumber
            },
            studentQuestions: studentQuestions
        };

        return studentExam;
    }


}
