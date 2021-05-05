import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentQuestion } from '../entities/student-question.entity';

@Injectable()
export class StudentQuestionService {

    constructor
    (
        @InjectRepository(StudentQuestion)
        private readonly studentQuestionRepository: Repository<StudentQuestion>
    ) {}

    async assessOpenQuestion(earnedPoints: number, questionId: number) {
        const question = await this.studentQuestionRepository.findOne({ id: questionId });
        Logger.log(earnedPoints + " " + questionId);
        if(earnedPoints > question.maxPoints) {
            return;
        } 

        question.earnedPoints = earnedPoints;
        await this.studentQuestionRepository.save(question);
    }
}
