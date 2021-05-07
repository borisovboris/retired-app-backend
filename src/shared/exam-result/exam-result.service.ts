import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/base/entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamResultService {
    constructor(){}

    getExamPoints(exam) {
        let totalEarnedPoints: number = 0;
        let totalMaxPoints: number = 0;

        for (let studentQuestion of exam.studentQuestions) {
            totalMaxPoints += studentQuestion.maxPoints;

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

        return { totalEarnedPoints, totalMaxPoints };

    }


}
