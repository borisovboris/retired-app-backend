import { Body, Controller, Post } from '@nestjs/common';

@Controller('topic')
export class TopicController {
    @Post('add')
    async addTopicToSubject(@Body() body) {
        const { name, subjectId } = body;
        
    }
}
