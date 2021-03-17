import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TopicService } from 'src/base/services/topic.service';

@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get(':id')
    async topicsOfSubject(@Param() params) {
        const subjectId = params.id;
        const topicsOfSubject = await this.topicService.getTopicsOfSubject(subjectId);
        return topicsOfSubject;
    } 

    @Post('add')
    async createSubject(@Body() body) {
        const { name, subjectId } = body;
        await this.topicService.addTopicToSubject(name, subjectId);
    }
}
