import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { TopicService } from 'src/base/services/topic.service';

@UseGuards(TeacherGuard)
@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get('details/:id')
    async getTopic(@Param() params) {
        const topicId = params.id;
        const topic = await this.topicService.getTopic(topicId);
        return topic;
    }

    @Get(':id/questions')
    async getTopicQuestions(@Param() params) {
        const topicId = params.id;
        const questions = await this.topicService.getQuestionsOfTopic(topicId);
        return questions;
    }

    @Get(':id')
    async topicsOfSubject(@Param() params) {
        const subjectId = params.id;
        const topicsOfSubject = await this.topicService.getTopicsOfSubject(subjectId);
        return topicsOfSubject;
    } 

    @Post('add')
    async createTopic(@Body() body) {
        const { name, subjectId } = body;
        await this.topicService.addTopicToSubject(name, subjectId);
    }
}
