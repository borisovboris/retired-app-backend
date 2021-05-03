import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { SessionService } from 'src/base/services/session.service';

@UseGuards(TeacherGuard)
@Controller('sessions')
export class SessionController {

    constructor
    (
        private readonly sessionService: SessionService
    ) { }


    @Get(':id')
    async getSession(@Param() params) {
        const sessionId = params.id;
        const session = await this.sessionService.getSession(sessionId);
        return session;
    }
    
    @Post('add')
    async createSession(@Body() body, @Req() req) {
        const userData = req.params.userData;
        const userId = userData["id"];
        this.sessionService.createSession(body, userId);
    }
}
