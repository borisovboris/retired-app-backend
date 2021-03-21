import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { QuestionService } from 'src/base/services/question.service';

@Controller('questions')
export class QuestionController {

    constructor
    (
        private readonly questionService: QuestionService
    ) {}

    @Get('answers/:id')
    async getQuestionAnswers(@Param() params) {
        const questionId = params.id;
        const answers = await this.questionService.getQuestionAnswers(questionId);
        return answers;
    }

    @Post()
    async addQuestion(@Body() question) {

        if(question.type === 'open') {
            this.questionService.addOpenQuestion(question);
        } else if (question.type === 'closed') {
            this.questionService.addClosedQuestion(question);
        }
        Logger.log(question);
    }

}
