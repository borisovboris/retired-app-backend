import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { StudentQuestionService } from 'src/base/services/student-question.service';


@Controller('student-questions')
export class StudentQuestionController {
    constructor
    (
        private readonly studentQuestionService: StudentQuestionService
    ) {}

    @Post('assess')
    async assessOpenQuestion(@Body() body) {
        Logger.log('hit');
        const { earnedPoints, questionId } = body;
        await this.studentQuestionService.assessOpenQuestion(earnedPoints, questionId);
        return;
    }
   
}
